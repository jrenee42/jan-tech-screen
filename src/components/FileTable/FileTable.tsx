import styles from './FileTable.module.scss';

type Props = {
    name: string;
};

const FileTable: React.FC<Props> = ({name}) => {
    return (
        <div> table will go here: {name} </div>
    );
};

export default FileTable;
