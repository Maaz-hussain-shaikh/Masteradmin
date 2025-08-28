import Input from "../../../form/input/InputField";
import Label from "../../../form/Label";
import Button from "../../../ui/button/Button";

export default function FaqModal() {
    return (<>
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">


            <div className="px-2 pr-14">
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                    Add Policies
                </h4>
                <button
                    className="flex w-full items-center justify-center mr-2 gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-orange-600 shadow-theme-xs hover:bg-gray-300 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-orange-600 dark:hover:bg-gray/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
                >

                    Policies</button>
                <button
                    className="flex w-full items-center justify-center gap-2 rounded-xl mr-2 border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-orange-600 shadow-theme-xs hover:bg-gray-300 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-orange-600 dark:hover:bg-gray/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
                >

                    FAQ</button>
                
            </div>
            <form className="flex flex-col mt-2">
                <div className="px-2 overflow-y-auto custom-scrollbar">


                    <div className="mb-4">

                       
                        <Label>Name</Label>
                        <Input type="text" placeholder="Meals"
                            value='' />
                    </div>
                    <div className="mb-4">
                        <Label>Discription</Label>
                        <Input type="text" placeholder="Meal is not Included in this"
                            value='' />
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