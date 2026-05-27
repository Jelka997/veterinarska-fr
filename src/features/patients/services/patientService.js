import Api from "../../../core/axiosConfig";

export async function createPatient(patientData) {
    const response = await Api.post(`/Patients`, patientData);
    return response.data;
}
export async function updatePatient(patientId, patientData) {
    const response = await Api.put(`/Patients/${patientId}`, patientData);
    return response.data;
}

export async function getAllPatients() {
    const response = await Api.get(`/Patients`);
    return response.data;
}

export async function getOnePatient(patientId) {
    const response = await Api.get(`/Patients/${patientId}`);
    return response.data;
}

export async function addVetToAPatient(patientId, vetId) {
    const response = await Api.put(`/Patients/${patientId}/vet`, vetId, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    return response.data;
}

export async function deletePatient(patientId) {
    const response = await Api.delete(`/Patients/${patientId}`);
    return response.data;
}

export async function getFilteredSortedPatients(
    filters,
    page,
    pageSize
) {
    const params = new URLSearchParams();

    params.append("page", page);
    params.append("pageSize", pageSize);
    if (filters.vetName) {
        params.append("VetName", filters.vetName);
    }

    if (filters.petName) {
        params.append("PetName", filters.petName);
    }
    if (filters.animalSpecie) {
        params.append("AnimalSpecie", filters.animalSpecie);
    }
    if (filters.ageFrom) {
        params.append("AgeFrom", filters.ageFrom);
    }
    if (filters.ageTo) {
        params.append("AgeTo", filters.ageTo);
    }

    const response = await Api.get(
        `Patients/filter?${params.toString()}`
    );

    return response.data;
}

