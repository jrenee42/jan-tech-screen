import Button from '@/components/Button/Button';

import '@/styles/global.scss';
import FileTable from "@/components/FileTable/FileTable";
import Main from "@/components/main/Main";


export default function Home() {

    return (
        <div>

            <Button> hi there </Button>
            <FileTable name={'jill-renee'}/>
            <Main/>

        </div>
    );
}
