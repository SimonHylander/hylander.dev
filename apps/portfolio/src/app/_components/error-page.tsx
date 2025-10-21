"use client";

export const ErrorPage = () => {
  return (
    <div className="flex grow flex-col items-center justify-center gap-4 text-2xl font-bold">
      <div className="p-8 text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">An error occurred</h1>
        <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          {/* <Link href="/" className={cn(buttonVariants({ variant: "default" }))}>
            Go back home
          </Link> */}
        </div>
      </div>
    </div>
  );
};
