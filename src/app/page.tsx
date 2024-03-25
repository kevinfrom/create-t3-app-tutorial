import {api} from "~/trpc/server";

import {currentUser, SignInButton, UserButton} from "@clerk/nextjs";

export default async function Home() {
	const hello = await api.post.hello({text: "from tRPC"});

	const user = await currentUser();

	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
			<p className="mb-4">{hello.greeting}</p>

			{!user && <SignInButton mode={"modal"}/>}
			{user && <UserButton/>}
		</main>
	);
}
