import Api from "../../../core/axiosConfig";

export async function createExamination(examinationData) {
    const response = await Api.post(`/Examination`, examinationData);
    return response.data;
}
export async function cancelExamination(examinationId, reason) {
    const response = await Api.put(`/Patients/${examinationId}`, reason, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    return response.data;
}
