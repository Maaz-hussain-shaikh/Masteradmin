import Input from "../../../form/input/InputField";
import TextArea from "../../../form/input/TextArea";
import Label from "../../../form/Label";
import Button from "../../../ui/button/Button";

export default function Intromodal() {
    return (<>
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">


            <div className="px-2 pr-14">
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                    Change Title and Discription
                </h4>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                    Please add meta discription as well
                </p>
            </div>
            <form className="flex flex-col">
                <div className="px-2 overflow-y-auto custom-scrollbar">
                   
                        <div className="mb-4">
                            <Label>Title</Label>
                            <Input type="text" placeholder="Title of Itinerary"
                                value='' />
                        </div>
                       
                     <div>
                            <Label>Discription</Label>
                            <TextArea
                                value=''
                                
                                rows={3}
                            />
                        </div>
                         <div>
                            <Label>Meta Discription</Label>
                            <TextArea
                                value=''
                                
                                rows={3}
                            />
                        </div>
                </div>
                <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                    <Button size="sm" >
                        Save Changes
                    </Button>
                </div>
            </form>

        </div>

    </>)
}