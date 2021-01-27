import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import ViewIcon from '@material-ui/icons/Portrait';
import FaceIcon from '@material-ui/icons/Face';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

class ListUserComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            filter: "",
            teachers: [],
            filteredData: [],
            message: null,
            verifyStatus: false
        }
        this.viewTeacher = this.viewTeacher.bind(this);
        this.searchTeacher = this.searchTeacher.bind(this);
        this.importTeacher = this.importTeacher.bind(this);
        this.reloadTeacherList = this.reloadTeacherList.bind(this);
    }

    componentDidMount() {
        let user_verified = window.sessionStorage.getItem('verify')
        if(user_verified === 'true') {
            this.setState({verifyStatus: true})
        } 
        this.reloadTeacherList();
    }

    searchTeacher = (e) => {
        this.setState({filter: e.target.value})
    };

    reloadTeacherList() {
        ApiService.fetchTeachers()
            .then((res) => {
                this.setState({teachers: res.data['teachers']})
            });
    }

    viewTeacher(id) {
        window.localStorage.setItem("teacherId", id);
        this.props.history.push('/view-teacher');
    }

    importTeacher() {
        window.localStorage.removeItem("teacherId");
        this.props.history.push('/add-teachers');
    }

    login() {
        window.localStorage.removeItem("teacherId");
        this.props.history.push('/login');
    }

    logout() {
        this.setState({verifyStatus: false})
    }

    render() {
        const { filter, teachers } = this.state;
        const filteredData = teachers.filter(
            d => {
                let firstName = d.first_name
                let lastName = d.last_name
                if (lastName.toLowerCase().includes(filter.toLowerCase())){
                    return lastName.toLowerCase().indexOf(filter.toLowerCase()) >= 0
                } else {
                    return firstName.toLowerCase().indexOf(filter.toLowerCase()) >= 0
                }
            }).map(d => {
                return (
                    <TableBody>
                        <TableRow key={d.id}>
                            <TableCell align="right">
                                {d.profile_picture.replace(/\s/g, '') === '' || d.profile_picture === '21239.JPG' ?
                                    <FaceIcon /> 
                                :
                                    <img style={image} src={process.env.PUBLIC_URL + `/teachers/${d.profile_picture}`} alt="" /> 
                                }
                            </TableCell>
                            <TableCell align="right">{d.first_name}</TableCell>
                            <TableCell align="right">{d.last_name}</TableCell>
                            <TableCell align="right">{d.email}</TableCell>
                            <TableCell align="right">{d.phone_number}</TableCell>
                            <TableCell align="right">{d.room_number}</TableCell>
                            <TableCell align="right" onClick={() => this.viewTeacher(d.id)}><ViewIcon /></TableCell>

                        </TableRow>
                </TableBody>
                )
            })

        return (
            <div>
                {this.state.verifyStatus === true ?
                    <div>
                    <Button style={authButton} variant="contained" color="primary" onClick={() => this.logout()}>
                        Logout
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => this.importTeacher()}>
                        Import Teachers
                    </Button>
                    </div>
                    :
                    <Button style={authButton} variant="contained" color="primary" onClick={() => this.login()}>
                        Login
                    </Button>
                }
                <Typography variant="h4" style={style}>List Of Teachers</Typography>
                <TextField style={search} id="standard-basic" label="Seacrh..." onChange={this.searchTeacher} />
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Picture</TableCell>
                            <TableCell align="right">First Name</TableCell>
                            <TableCell align="right">Last Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Phone Number</TableCell>
                            <TableCell align="right">Room Number</TableCell>
                            <TableCell align="right">Teacher Profile</TableCell>
                        </TableRow>
                    </TableHead>
                    {filteredData}
                </Table>

            </div>
        );
    }

}

const search = {
    margin: 20,
    display: 'flex',
    justifyContent: 'right'
}

const authButton = {
    display: 'flex',
    justifyContent: 'right',
    margin: 30
}

const image = {
    height: 42,
    width: 42
}

const style ={
    display: 'flex',
    justifyContent: 'center'
}

export default ListUserComponent;