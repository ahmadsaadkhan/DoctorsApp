"use client"
import { getPatients, getPatient, deletePatient, fetchDiseases } from '@/services/ApiCalls';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AddPatientModal } from '@/components/AddPatientModal';
import { Toast } from '@/components/Toast';

const Patients = () => {
  const [patientsList, setPatientsList] = useState(null);
  const [diseasesList, setDiseasesList] = useState(null);

  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => { setOpen(false), setPatientData([]) };
  const [patientData, setPatientData] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const initialFilters = {
    age: '',
    disease: '',
    gender: '',
  }
  const [filters, setFilters] = useState(initialFilters);

  const fetchData = async () => {
    try {
      const patientsPromise = getPatients(filters);
      const diseasesPromise = fetchDiseases();
      const [patientsResult, diseasesResponse] = await Promise.all([patientsPromise, diseasesPromise]);
      setPatientsList(patientsResult.data);
      setDiseasesList(diseasesResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [trigger]);
  console.log(patientsList);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleFilters = (e) => {
    e.preventDefault()
    fetchData();
  }

  const handleEdit = async (id) => {
    const response = await getPatient(id);
    if (response) {
      setPatientData(response.data);
      onOpenModal();
    }
  };

  const handleDelete = async (id) => {
    const response = await deletePatient(id);
    if (response) {
      setTrigger(!trigger);
      Toast({ message: 'Patient deleted successfully.', type: 'success' });
    }
  };

  const TableHeader = ({ children }) => (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      {children}
    </th>
  );

  const TableCell = ({ children }) => (
    <td className="px-6 py-4 whitespace-nowrap">{children}</td>
  );

  return (
    <>
      <div className="p-4">
        <div className='flex p-2 justify-end'>
          <button onClick={onOpenModal} className="bg-blue-500 text-white px-2 py-1 rounded-md mt-4">Create New</button>
        </div>

        <form onSubmit={handleFilters}>
          <div className="p-2 flex justify-between border">
            <div className="flex-1 items-center">
              <label htmlFor="age" className="mr-2">Age:</label>
              <input
                type="number"
                id="age"
                name="age"
                value={filters.age}
                onChange={handleFilterChange}
                className="border rounded-md p-2"
              />
            </div>
            <div className="flex-1 items-center">
              <label htmlFor="disease" className="mr-2">Disease:</label>
              <select
                id="disease"
                name="disease"
                value={filters.disease}
                onChange={handleFilterChange}
                className="border rounded-md p-2 "
              >
                <option value="">All</option>
                {diseasesList && diseasesList.map((disease) => (
                  <option value={disease.id}>{disease.name}</option>
                ))}
              </select>
            </div>
            <div className="flex-1 items-center">
              <label htmlFor="gender" className="mr-2">Gender:</label>
              <select
                id="gender"
                name="gender"
                value={filters.gender}
                onChange={handleFilterChange}
                className="border rounded-md p-2"
              >
                <option value="">All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-2 rounded-md">Apply</button>
          </div>
        </form>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <TableHeader>Name</TableHeader>
                <TableHeader>Age</TableHeader>
                <TableHeader>Gender</TableHeader>
                <TableHeader>Disease</TableHeader>
                <TableHeader>Phone Number</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Actions</TableHeader>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {patientsList && patientsList.map((patient, index) => (
                <tr key={index}>
                  <TableCell>
                    <Link href={`patient/${patient.id}`}>
                      <span className="text-blue-500 hover:underline">{patient.patient_name}</span>
                    </Link>
                  </TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>{patient.gender}</TableCell>
                  <TableCell>{patient.Disease && patient.Disease.name}</TableCell>
                  <TableCell>{patient.phone_number}</TableCell>
                  <TableCell>{patient.status}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <button onClick={() => handleEdit(patient.id)} className="text-blue-500 hover:text-blue-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M1.707 13.293a1 1 0 0 1 0-1.414L8.586 4H7a1 1 0 0 1 0-2h5a1 1 0 0 1 1 1v5a1 1 0 0 1-2 0V5.414l-8.293 8.293a1 1 0 0 1-1.414 0zM15 16a1 1 0 0 1-1 1H6a1 1 0 0 1 0-2h8a1 1 0 0 1 1 1z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button onClick={() => handleDelete(patient.id)} className="text-red-500 hover:text-red-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 3a1 1 0 0 1 1 1v7a1 1 0 0 1-2 0V4a1 1 0 0 1 1-1zm2 11a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-1H5a1 1 0 0 1 0-2h1V7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2h-1v1zM5.707 16.707A1 1 0 0 1 5 16V8a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8a1 1 0 0 1-.293.707l-4 4A1 1 0 0 1 9 20H7a1 1 0 0 1-.707-.293l-4-4z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </TableCell>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddPatientModal
        patientData={patientData}
        open={open}
        setOpen={setOpen}
        onOpenModal={onOpenModal}
        onCloseModal={onCloseModal}
        Toast={Toast}
        trigger={trigger}
        setTrigger={setTrigger}
      />
    </>
  );
}

export default Patients;