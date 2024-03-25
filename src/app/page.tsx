import {api} from '~/trpc/server'

import {currentUser} from '@clerk/nextjs'
import Image from "next/image";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export async function CreatePostWizard() {
	const user = await currentUser();

	if (!user) return null;

	return (
		<div className="flex space-x-3">
			<Image src={user.imageUrl} alt="Profile image" className="h-14 w-14 rounded-full" width={56} height={56}/>
			<input placeholder="Type some emojis!" className="bg-transparent w-full outline-none"/>
		</div>
	);
}

export default async function Home() {
	const posts = await api.post.getAll();

	return (
		<main className="flex justify-center h-screen">
			<div className="w-full border-x border-slate-200 md:max-w-2xl">
				<div className="flex border-b border-slate-400 p-4">
					<CreatePostWizard/>
				</div>

				<div className="flex flex-col">
					{posts.map(({post, author}) => (
						<div key={post.id} className="flex p-4 items-center space-x-3 border-b border-slate-400">
							<Image src={author.imageUrl} alt="Profile image" className="h-14 w-14 rounded-full" width={56} height={56}/>

							<div>
								<p className="text-slate-400 flex space-x-1">
									<span>{`@${author.username}`}</span>
									<span>·</span>
									<span>{dayjs(post.createdAt).fromNow()}</span>
								</p>

								<p>{post.content}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</main>
	);
}
