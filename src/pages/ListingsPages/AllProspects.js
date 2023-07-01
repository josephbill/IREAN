import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';

// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
// sections
import { UserListHead, UserListToolbar, UserListOptions, UserListEmpty } from '../../sections/@dashboard/user';

import LoadingSpinner from '../../utils/loadingSpinner';

// mock


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'id', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'phone', label: 'Phone', alignRight: false },
  { id: 'priority', label: 'Priority', alignRight: false },
  { id: 'comments', label: 'Comments', alignRight: false },
  { id: 'actions', label: 'Actions', alignRight: false },

];

// ----------------------------------------------------------------------

// fetch the data and replace array 

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query, roleQuery) {
  console.log(roleQuery);

  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return b[1] - a[1];
  });

 

  if (query) {
    return filter(array, (_user) =>
      _user.prospectname.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }

  if (roleQuery) {
    return filter(array, (_user) => _user.prospectpriority === roleQuery);
  }

  return stabilizedThis.map((el) => el[0]);
}


export default function AllProspects() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');
  const [filterPriority, setFilterPriority] = useState('');


  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [newProspectArray,setNewProspectArray] = useState([]);

  const [isLoading, setIsLoading] = useState(false);


  const location = useLocation();


  const products = location.state?.products;


  let prospectArray = []

  const userrole = localStorage.getItem("userrole")
  const userid = localStorage.getItem("userid")




  useEffect(() => {
 
    const getProspects = async () => {
        try {
          const response = await fetch(`https://irean.onrender.com/listings/${products.id}`, {
            method: 'GET',
          });
          const data = await response.json();
        prospectArray = data.listing.prospects
        if(userrole === "2"){
            prospectArray = prospectArray.filter(obj => obj.user_id === parseInt(userid,10));
         }
        setNewProspectArray(prospectArray)

        } catch (error) {
          console.log('API error:', error);
        }
      };
      getProspects();

}, [])



  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = newProspectArray.map((n) => n.prospectname);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleFilterByPriority = (event) => {
    setPage(0);
    setFilterPriority(event.target.value);
  };


  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - newProspectArray.length) : 0;

  const filteredProspects = applySortFilter(newProspectArray, getComparator(order, orderBy), filterName, filterPriority);

  const isNotFound = !filteredProspects.length && !!filterName;

  const navigate = useNavigate();



  return (
    <>
      <Helmet>
        <title> Prospects | IREAN </title>
      </Helmet>

      {isLoading ? <LoadingSpinner /> : null}


      <Container>
  
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography style={{
            marginTop: 30
          }} variant="h4" gutterBottom>
            Prospects
          </Typography>
        
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent={'space-evenly'} mb={3}>
        <Button variant="contained" color='orange' startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => navigate('/dashboard/products')}
          >
           Back to Listings
          </Button>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => navigate('/dashboard/app')}
          >
            Back To Dashboard
          </Button>
        </Stack>

        <Card>
        <Stack direction="row" alignItems="center" mb={5}>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
          <UserListEmpty label="Priority" numSelected={selected.length} filterName={filterPriority} onFilterName={handleFilterByPriority} />
        </Stack>

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={prospectArray.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody> 

                  {filteredProspects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    
                    const { id,prospectname, prospectemail , prospectphone, prospectpriority, prospectcomment } = row;
                    const selectedUser = selected.indexOf(prospectname) !== -1;
                

                    

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, prospectname)} />
                        </TableCell>

                        <TableCell align="left">{id}</TableCell>


                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {prospectname}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">
                        {prospectemail}
                        </TableCell>

                        <TableCell align="left">
                        {prospectphone}
                        </TableCell>

                        <TableCell align="left">
                        { prospectpriority === "Hot"  &&  
                          <span style={{
                            color: 'red'
                          }}>{prospectpriority}</span>
                        }
                           { prospectpriority === "Warm"  &&  
                           <span style={{
                            color: 'purple'
                          }}>{prospectpriority}</span>
                        }
                           { prospectpriority === "Cold"  &&  
                           <span style={{
                            color: 'blue'
                          }}>{prospectpriority}</span>
                        }
                        </TableCell>


                        <TableCell align="left">
                        {prospectcomment}
                        </TableCell>

                      

                        <TableCell align="left">
                        <Button variant="contained" color='primary' startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => navigate(`/editProspect/${id}`,{state: {id , products}})}
            >
           Edit Prospect
          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={prospectArray.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={() => {
            // edit verification status of user 
            
          }}>
          <Iconify  icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit Prospect 
        </MenuItem>



        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
