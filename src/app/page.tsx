import Image from "next/image";
import Button from '@/components/Button/Button';

import styles from "./page.module.css";
import '@/styles/global.scss';
import FileTable from "@/components/FileTable/FileTable";

export default function Home() {
    return (
        <div className={styles.page}>

            <Button> hi there </Button>
            <FileTable name={'jill-renee'}/>
               
        </div>
    );
}
