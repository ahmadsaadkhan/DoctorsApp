
'use client'
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { fetchDiseases, savePatient } from "@/services/ApiCalls";

export const AddPatientModal = ({ patientData, open, setOpen, onOpenModal, onCloseModal, Toast, trigger, setTrigger }) => {
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
    const [diseasesList, setDiseasesList] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchDiseases();
                setDiseasesList(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (patientData) {
            setValue('patient_name', patientData.patient_name || '');
            setValue('age', patientData.age || '');
            setValue('gender', patientData.gender || '');
            setValue('disease', patientData.disease || '');
            setValue('phone_number', patientData.phone_number || '');
            setValue('address', patientData.address || '');
            setValue('status', patientData.status || '');
        }
    }, [patientData]);

    const onSubmit = async (data) => {
        const response = await savePatient(data);
        if (response && response.success) {
            setOpen(false);
            setTrigger(!trigger);
            Toast({ message: 'Patient added successfully.', type: 'success' });
        } else {
            Toast({ message: 'Patient did not added there is some problem.', type: 'error' });
        }
    }

    return (
        <>
            <div className="w-1/2 mx-auto">
                <Modal open={open} onClose={onCloseModal} center>
                    <form onSubmit={handleSubmit(onSubmit)} className="">
                        <div className="mb-4">
                            <label className="block mb-1">Name:</label>
                            <input
                                {...register("patient_name", { required: "Patient name is required" })}
                                className={`border rounded-md px-3 py-2 w-full ${errors.patient_name ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.patient_name && <span className="text-red-500 text-sm">{errors.patient_name.message}</span>}
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1">Age:</label>
                            <input type="number" {...register("age", { min: 18, max: 99, required: "Age must be between 18 and 99" })} className={`border rounded-md px-3 py-2 w-full ${errors.age ? 'border-red-500' : 'border-gray-300'}`} />
                            {errors.age && <span className="text-red-500 text-sm">{errors.age.message}</span>}
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1">Gender:</label>
                            <select {...register("gender", { required: "Please select your gender" })} className={`border rounded-md px-3 py-2 w-full ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}>
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.gender && <span className="text-red-500 text-sm">{errors.gender.message}</span>}
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Disease:</label>
                            <select {...register("disease", { required: "Please select disease" })} className={`border rounded-md px-3 py-2 w-full ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}>
                                <option value="">Select</option>
                                {diseasesList && diseasesList.map((disease) => (
                                    <option key={disease.id} value={disease.id}>{disease.name}</option>
                                ))}
                            </select>
                            {errors.disease && <span className="text-red-500 text-sm">{errors.disease.message}</span>}
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1">Phone Number:</label>
                            <input {...register("phone_number", { required: "Phone number is required" })} className={`border rounded-md px-3 py-2 w-full ${errors.phone_number ? 'border-red-500' : 'border-gray-300'}`} />
                            {errors.phone_number && <span className="text-red-500 text-sm">{errors.phone_number.message}</span>}
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1">Address:</label>
                            <textarea {...register("address", { required: "Address is required" })} className={`border rounded-md px-3 py-2 w-full ${errors.address ? 'border-red-500' : 'border-gray-300'}`}></textarea>
                            {errors.address && <span className="text-red-500 text-sm">{errors.address.message}</span>}
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Status:</label>
                            <select {...register("status", { required: "Please select your status" })} className={`border rounded-md px-3 py-2 w-full ${errors.status ? 'border-red-500' : 'border-gray-300'}`}>
                                <option value="">Select</option>
                                <option value="Active">Active</option>
                                <option value="InActive">InActive</option>
                                <option value="Discharged">Discharged</option>
                                <option value="On Hold'">On Hold</option>
                            </select>
                            {errors.status && <span className="text-red-500 text-sm">{errors.status.message}</span>}
                        </div>

                        <input type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md cursor-pointer" />
                    </form>
                </Modal >
            </div>
        </>

    )
}
