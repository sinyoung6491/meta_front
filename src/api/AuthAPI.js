import axios from "axios";

const TOKEN_TYPE = localStorage.getItem("tokenType");
let ACCESS_TOKEN = localStorage.getItem("accessToken");

const AuthApi = axios.create({
    baseURL: "http://15.165.73.36:1234",
    headers: {
        'Content-Type': 'application/json',
        // Authorization 헤더는 로그인이 필요한 API 호출에서만 사용하세요
        'Authorization': `${TOKEN_TYPE} ${ACCESS_TOKEN}`, 
    },
});

/** LOGIN API */
export const login = async ({ username, password }) => {
    const data = { username, password };
    const response = await AuthApi.post(`/auth/login`, data);
    return response.data;
}

/** SIGNUP API */
export const signup = async ({ username, password, role }) => {
    try {
        const data = { username, password, role };
        const response = await AuthApi.post(`/auth/signup`, data);
        return response.data;
    } catch (error) {
        if (error.response) {
            // 서버가 오류 응답을 반환한 경우
            console.error("Error Response:", error.response.data);
            // 잘못된 요청 처리
            console.error("Error Status:", error.response.status);
            // 인증 오류 처리
            console.error("Error Headers:", error.response.headers);
            // 서버 오류 처리
        } else if (error.request) {
            // 요청이 서버에 도달하지 못한 경우
            console.error("Error Request:", error.request);
            // 네트워크 문제, 서버 주소 오류 등 점검
        } else {
            // 오류를 발생시킨 요청 설정 문제
            console.error("Error Message:", error.message);
             // 요청 설정 문제 점검
        }
        throw error; // 오류를 상위 호출자에게 전달
    }

}