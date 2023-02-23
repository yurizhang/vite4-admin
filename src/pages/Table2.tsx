// @ts-nocheck  
// @ts-ignore
// @ts-nocheck   is ignore entire file, and @ts-ignore is ingore sing line
import React from 'react';
import {
    Flex,
    Checkbox,
    Table,
    TableHeader,
    TableHeaderRow,
    TableHeaderCell,
    TableBody,
    TableRow,
    TableCell,
} from "@tonic-ui/react";
import { useTable, useBlockLayout, useRowSelect } from 'react-table';

const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    return (
        <Checkbox
            ref={resolvedRef}
            indeterminate={indeterminate}
            {...rest}
        />
    );
});

export default function SelectableTable() {
    const columns = React.useMemo(() => [
        {
            Header: 'Event Type',
            accessor: 'eventType',
            width: 240,
        },
        {
            Header: 'Affected Devices',
            accessor: 'affectedDevices',
            width: 140,
            customProps: {
                textAlign: 'right',
            },
        },
        {
            Header: 'Detections',
            accessor: 'detections',
            width: 136,
            customProps: {
                textAlign: 'right',
            },
        },
    ], []);

    const data = React.useMemo(() => [
        { id: 1, eventType: 'Virus/Malware', affectedDevices: 20, detections: 634 },
        { id: 2, eventType: 'Spyware/Grayware', affectedDevices: 20, detections: 634 },
        { id: 3, eventType: 'URL Filtering', affectedDevices: 15, detections: 598 },
        { id: 4, eventType: 'Web Reputation', affectedDevices: 15, detections: 598 },
        { id: 5, eventType: 'Network Virus', affectedDevices: 15, detections: 497 },
        { id: 6, eventType: 'Application Control', affectedDevices: 0, detections: 0 }
    ], []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows,
        state: { selectedRowIds },
    } = useTable(
        {
            columns,
            data,
        },
        useBlockLayout,
        useRowSelect,
        hooks => {
            hooks.visibleColumns.push((columns: any) => [
                {
                    id: 'selection',
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <Flex height="100%" alignItems="center">
                            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                        </Flex>
                    ),
                    Cell: ({ row }) => (
                        <Flex height="100%" alignItems="center">
                            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                        </Flex>
                    ),
                    width: 48,
                },
                ...columns,
            ]);
        }
    );

    return (
        <>
            <Table {...getTableProps()}>
                <TableHeader>
                    {headerGroups.map(headerGroup => (
                        <TableHeaderRow {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <TableHeaderCell
                                    {...column.getHeaderProps()}
                                    {...column.customProps}
                                >
                                    {column.render('Header')}
                                </TableHeaderCell>
                            ))}
                        </TableHeaderRow>
                    ))}
                </TableHeader>
                <TableBody {...getTableBodyProps()}>
                    {rows.slice(0, 10).map((row, i) => {
                        prepareRow(row);
                        const isChecked = Object.keys(selectedRowIds).indexOf(row.id) >= 0;
                        return (
                            <TableRow
                                {...row.getRowProps()}
                                {...isChecked && { bg: 'rgba(255, 255, 255, 0.08)' }}
                                _hover={{
                                    bg: 'rgba(255, 255, 255, 0.12)'
                                }}
                            >
                                {row.cells.map(cell => {
                                    return (
                                        <TableCell
                                            {...cell.getCellProps()}
                                            {...cell.column.customProps}
                                        >
                                            {cell.render('Cell')}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            <p>Selected Rows: {Object.keys(selectedRowIds).length}</p>
            <pre>
                <code>
                    {JSON.stringify(
                        {
                            selectedRowIds: selectedRowIds,
                            'selectedFlatRows[].original': selectedFlatRows.map(
                                d => d.original
                            ),
                        },
                        null,
                        2
                    )}
                </code>
            </pre>
        </>
    );
}
