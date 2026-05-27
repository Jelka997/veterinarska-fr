import Api from "../../../core/axiosConfig";

export async function getAllVets() {
    const response = await Api.get(`/Vet`);
    return response.data;
}
export async function getOneVet(vetId) {
    const response = await Api.get(`/Vet/${vetId}`);
    return response.data;
}