import style from '../Table/style.module.scss'
import { TableProps } from "../../interfaces";


const Table: React.FC<TableProps> = ({ rows, columns, loading, setRows }) => {

    const handleCellClick = (rowIndex: number, cellIndex: number) => {
        setRows(prevStates => {
            const newCellStates = [...prevStates];
            newCellStates[rowIndex] = [...newCellStates[rowIndex]];
            newCellStates[rowIndex][cellIndex] = !newCellStates[rowIndex][cellIndex];
            return newCellStates;
        });
    }

    return (
        <div className={style.table}>
            <h2>{!loading ? '' : 'Generated Table...'}</h2>

            <table>
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index}>
                                <span className={style.rotate}>{col}</span>
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                cellIndex === 0 ? <td key={cellIndex}>{`${cell.toString()} ${rowIndex + 1} `}</td> :
                                    <td onClick={() => handleCellClick(rowIndex, cellIndex)} key={cellIndex} className={cell ? style.cellTrue : style.cellFalse}></td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;