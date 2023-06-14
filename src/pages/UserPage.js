import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
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
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar, UserListOptions } from '../sections/@dashboard/user';
import LoadingSpinner from '../utils/loadingSpinner';

// mock
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'id', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'verification', label: 'Verified', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'phone', label: 'Phone', alignRight: false },
  { id: 'attachment', label: 'Attachment', alignRight: false },
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
    return a[1] - b[1];
  });

  if (query && roleQuery) {
    return filter(array, (_user) =>
      _user.username.toLowerCase().indexOf(query.toLowerCase()) !== -1 &&
      _user.userrole === roleQuery
    );
  }

  if (query) {
    return filter(array, (_user) =>
      _user.username.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }

  if (roleQuery) {
    return filter(array, (_user) => _user.userrole === roleQuery);
  }

  return stabilizedThis.map((el) => el[0]);
}


export default function UserPage() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');
  const [filterRole, setFilterRole] = useState('');


  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [newUserArray,setNewUserArray] = useState([]);

  const [isLoading, setIsLoading] = useState(false);


  let userArray = []

  useEffect(() => {
 
    const getUsers = async () => {
        try {
          const response = await fetch('https://irean.onrender.com/users', {
            method: 'GET',
          });
          const data = await response.json();
        userArray = data.users
        console.log(userArray)
        // setNewUserArray(userArray)
        getUsersProfile(userArray)
        } catch (error) {
          console.log('API error:', error);
        }
      };
      getUsers();

}, [])

console.log("Outside useEffect " , newUserArray)

const getUsersProfile = (userArray) => {

// Using map to iterate over the array
const profileDetails = userArray.map((user) => {
  const { id, username, userrole, profile, verification } = user;
 
  // Check if profile exists
  if (profile) {
    const { userphone, useremail, profileimages, profileattachements } = profile;
    localStorage.setItem("image",profileimages)

    return {
      id,
      verification,
      username,
      userrole,
      userphone,
      useremail,
      profileimages,
      profileattachements,
    };
  }

  // Handle the case where profile is missing
  return {
    id,
    username,
    verification,
    userrole,
    userphone: null,
    useremail: null,
    profileimages: null,
    profileattachements: null,
  };
});

setNewUserArray(profileDetails)
}

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
      const newSelecteds = newUserArray.map((n) => n.username);
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

  const handleFilterByRole = (event) => {
    setPage(0);
    setFilterRole(event.target.value);
  };
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - newUserArray.length) : 0;

  const filteredUsers = applySortFilter(newUserArray, getComparator(order, orderBy), filterName, filterRole);

  const isNotFound = !filteredUsers.length && !!filterName;

  const navigate = useNavigate();

  const downloadUrl = (link) => {
      // Create a temporary <a> element
  const linkage = document.createElement('a');
  linkage.href = link;

  // Set the download attribute to specify the suggested file name
  linkage.download = 'filename.ext';

  // Trigger the click event on the link element to start the download
  linkage.click();
  }


  const unverifyUser = async (id) => {
    setIsLoading(true);
  
    const updateData = {
      verification: "0",
    };
  
    try {
      const response = await fetch(`https://irean.onrender.com/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
  
      if (response.ok) {
        // Listing successfully updated
        const updatedListing = await response.json();
        console.log(updatedListing);
        alert("User has been unverified.")
        navigate('/dashboard/app')
  
      } else {
        // Error occurred during the update
        const errorData = await response.json();
        console.log(errorData);
        alert("Error occurred on update.")
        navigate('/dashboard/app')
      }
    } catch (error) {
      console.log(error);
    }
  
    setIsLoading(false);
  }

  const verifyUser = async (id) => {
    setIsLoading(true);
  
    const updateData = {
      verification: "1",
    };
  
    try {
      const response = await fetch(`https://irean.onrender.com/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
  
      if (response.ok) {
        // Listing successfully updated
        const updatedListing = await response.json();
        alert(updatedListing)
        alert("Verification Updated.")
        navigate('/dashboard/app')
  
      } else {
        // Error occurred during the update
        const errorData = await response.json();
        console.log(errorData);
        alert("Error occurred on update.")
        navigate('/dashboard/app')
      }
    } catch (error) {
      console.log(error);
    }
  
    setIsLoading(false);
  };

  return (
    <>
      <Helmet>
        <title> Users | IREAN </title>
      </Helmet>

      {isLoading ? <LoadingSpinner /> : null}


      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Users
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => navigate('/dashboard/addUsers')}
          >
            New User
          </Button>
        </Stack>

        <Card>
        <Stack direction="row" alignItems="center" mb={5}>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
          <UserListOptions numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByRole} /> 
        </Stack>

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={newUserArray.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody> 
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, username, userrole,verification, profileimages , profileattachements, userphone, useremail } = row;
                    console.log(profileimages)
                    console.log(typeof(profileimages))
                    const selectedUser = selected.indexOf(username) !== -1;
                    const avatarUrl = profileimages && profileimages.url ? profileimages.url : 'https://res.cloudinary.com/dqlqmfjkt/image/upload/v1684488675/logo_ni8n0u.svg';
                    const attachUrl = profileattachements && profileattachements.url ? profileattachements.url : 'https://res.cloudinary.com/dqlqmfjkt/image/upload/v1684488675/logo_ni8n0u.svg';
                    const emailProf = useremail 
                    const phoneProf = userphone

                    

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, username)} />
                        </TableCell>

                        <TableCell align="left">{id}</TableCell>


                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                          <Avatar alt={username} src={avatarUrl} />
                            <Typography variant="subtitle2" noWrap>
                              {username}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">
                        {userrole === "0" ? 'Super Admin' : userrole === "1" ? 'Property Owner' : userrole === "2" ? 'IREAN Real Estate Agent' : userrole
                        === "3" ? 'IREAN Property Champion' : userrole === "4" ? 'IREAN Sales Support Staff' : userrole === "5" ? 'IREAN Media and Marketing' : userrole
                        }
                        </TableCell>

                        <TableCell align="left">
                        {verification === null && 
  <LoadingButton color='orange' variant='contained' onClick={() => {
    unverifyUser(id)
  }}>                          No
                          </LoadingButton>
                          }
                          {verification === "0" && 
  <LoadingButton color='orange' variant='contained' onClick={() => {
    verifyUser(id)
  }}>                            No
                          </LoadingButton>
                          }
                           {verification === "1" && 
                          <LoadingButton variant='contained' onClick={() => {
                            unverifyUser(id)
                          }}>
                          Yes
                          </LoadingButton>
                          }
                        </TableCell>

                        <TableCell align="left">{emailProf}</TableCell>

                        <TableCell align="left">{phoneProf}</TableCell>

                        <TableCell align="left">

                        <LoadingButton fullWidth size="small" type="submit" variant="contained" onClick={() => {
                          downloadUrl(attachUrl)
                        }}>
                         Preview
                        </LoadingButton>
                        </TableCell>
                  

                        {/* <TableCell align="left">
                          <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label>
                        </TableCell> */}

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
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
            count={userArray.length}
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
          Verify User 
        </MenuItem>



        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
