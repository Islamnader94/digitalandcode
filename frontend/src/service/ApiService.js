import axios from 'axios';

const Import_Teacher_URL = 'http://localhost:8000/teachers/import-teachers';
const Get_All_Teachers_URL = 'http://localhost:8000/teachers/get-teachers'
const Get_Teacher_URL = 'http://localhost:8000/teachers/get-teacher'
const Verify_User_URL = 'http://localhost:8000/teachers/authenticate'


class ApiService {

    fetchTeachers() {
        return axios.get(Get_All_Teachers_URL);
    }

    fetchTeacherById(teacherId) {
        return axios.get(Get_Teacher_URL + '/' + teacherId);
    }

    VerifyUser(payload) {
        return axios.post(""+Verify_User_URL, payload)
    }

    addTeachers(file) {
        return axios.post(""+Import_Teacher_URL, file, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
    }

    // editUser(user) {
    //     return axios.put(USER_API_BASE_URL + '/' + user.id, user);
    // }

}

export default new ApiService();