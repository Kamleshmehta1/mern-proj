import React, { useCallback, useState } from 'react';
import {
  TableHead,
  TableCell,
  TableRow,
  Checkbox,
  Typography,
  TableContainer,
  Table,
  TableBody,
  IconButton,
  Tooltip,
  Stack,
  Paper,
  Toolbar,
  alpha,
  TablePagination,
} from '@mui/material';
import NoTableData from './NoTableData';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';

function TableHeader({ columns, rowData, selected, setSelected }) {
  const handleOnSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rowData.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  return (
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          checked={rowData?.length > 0 && selected.length === rowData?.length}
          onChange={handleOnSelectAllClick}
        />
      </TableCell>
      {columns?.map(({ headerName: title }) => {
        return (
          <TableCell padding="normal" key={title}>
            <Typography variant="subtitle1">{title}</Typography>
          </TableCell>
        );
      })}
    </TableRow>
  );
}

function ToolBarComponent({ selected, rowData, onDelete, tableTitle }) {
  const handleDelete = useCallback(() => {
    const data = rowData?.filter((row) => selected?.includes(row?.id));
    onDelete(data);
  }, [onDelete, rowData, selected]);

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(selected.length > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {selected?.length > 0 ? (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          flex={1}
        >
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="h6"
            component="div"
          >
            {selected?.length} selected
          </Typography>
          <Tooltip title="Delete">
            <IconButton onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      ) : (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          flex={1}
        >
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            {tableTitle}
          </Typography>
          {!selected?.length ? (
            <Tooltip title="Filter list">
              <IconButton>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          ) : null}
        </Stack>
      )}
    </Toolbar>
  );
}

function TableWrapper(props) {
  const {
    rowKey,
    onRowClick,
    isLoading,
    rowData,
    columns,
    rowsPerPage,
    page,
    handleChangePage,
    handleChangeRowsPerPage,
    rowsPerPageOptions,
  } = props;

  const [selected, setSelected] = useState([]);

  const handleRowClick = useCallback(
    (event, row) => {
      if (selected?.includes(row?.id)) {
        const selectedOne = selected?.filter((ele) => ele !== row?.id);
        setSelected(selectedOne);
      } else {
        setSelected([...selected, row?.id]);
      }
      onRowClick(row);
    },
    [onRowClick, selected]
  );

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      <ToolBarComponent selected={selected} {...props} />
      <TableContainer sx={{ position: 'relative' }}>
        <Table size="medium">
          <TableHead>
            <TableHeader
              selected={selected}
              setSelected={setSelected}
              {...props}
            />
          </TableHead>

          <TableBody>
            {rowData?.map((row, index) => {
              const isItemSelected = isSelected(row.id);
              return (
                <TableRow
                  hover
                  key={row[rowKey]}
                  onClick={(event) => handleRowClick(event, row)}
                  sx={{ cursor: 'pointer' }}
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" checked={isItemSelected} />
                  </TableCell>
                  {columns?.map(({ headerName, render }) => {
                    return (
                      <TableCell
                        key={headerName}
                        onClick={(e) => {
                          headerName?.includes('action') && e.stopPropagation();
                        }}
                      >
                        {render(row)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
            {!isLoading && !rowData?.length ? <NoTableData /> : null}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={rowData?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default TableWrapper;
