import { HyperText } from "./magicui/hyper-text";
import { InteractiveHoverButton } from "./magicui/interactive-hover-button";
import { Events } from "./Events";
export default function Main() {
    return (
        <div className="mt-52 flex flex-col justify-center items-center ">
            <h1 className="text-5xl font-bold mb-2"><HyperText className="text-5xl">Welcome to the UoM Computer Club</HyperText></h1>
            <h2 className="text-xl mb-4">Empowering students through technology, innovation, and collaboration.</h2>
            <button className="mt-10 px-6 py-2  rounded-lg  transition-all"><InteractiveHoverButton>View all our upcoming events</InteractiveHoverButton></button>
            <h2 className="mt-28 text-xl font-medium ">Scroll to see our hottest events of the moment</h2>
           <div className="flex flex-row justify-center items-center gap-4 mt-2">
            
                <Events />
                <Events />
                <Events />
           </div>
        </div>
    );
}
