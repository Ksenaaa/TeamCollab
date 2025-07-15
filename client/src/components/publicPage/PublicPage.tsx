import Link from "next/link";

export const PublicPage = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight mb-6">
                Organize, Plan, and Achieve More with <span className="text-indigo">Task Board</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-800 mb-10">
                Your ultimate tool for creating projects, dynamic dashboards, intuitive lists, and manageable tasks. Experience seamless drag-and-drop functionality for unparalleled productivity.
            </p>

            <section className="bg-indigo text-white py-16 px-6 md:px-12 lg:px-24 text-center rounded-4xl shadow-lg">
                <h2 className="text-4xl font-bold mb-6">Ready to Boost Your Productivity?</h2>
                <Link href="/auth/signin" className="bg-white text-indigo font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300 ease-in-out transform hover:-translate-y-1">
                    Log In and start Your Journey
                </Link>
            </section>
        </div>
    );
}
