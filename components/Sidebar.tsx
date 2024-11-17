import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"
  
import Link from "next/link"

const Sidebar = () => {
    return (
        <div className="padding m-2 padding pr-100">
            <Command>
                <CommandList>
                    <CommandGroup heading="Suggestions">
                    <CommandItem className="padding pt-5 padding pb-5">
                        <Link href={"/"}>Statistics</Link>
                    </CommandItem>
                    <CommandItem className="padding pt-5 padding pb-5">
                        <Link href={"/"}>Leaderboard </Link>
                    </CommandItem>
                    <CommandItem className="padding pt-5 padding pb-5">
                        <Link href={"/"}>Chatbot </Link>
                    </CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        </div>
    )
}

export default Sidebar