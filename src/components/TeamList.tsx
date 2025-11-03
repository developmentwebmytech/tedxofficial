// 'use client';
// import { useEffect, useState } from 'react';
// import TeamForm from './TeamForm';
// import Image from 'next/image';

// type TeamMember = {
//     _id: string;
//     name: string;
//     position: string;
//     about: string;
//     image: string;
//     socials: {
//         facebook: string;
//         linkedin: string;
//         twitter: string;
//         youtube: string;
//     };
// };

// export default function TeamList() {
//     const [members, setMembers] = useState<TeamMember[]>([]);
//     const [editMember, setEditMember] = useState<TeamMember | null>(null);

//     const fetchMembers = async () => {
//         const res = await fetch('/api/team');
//         const data = await res.json();
//         setMembers(data.data);
//         setEditMember(null);
//     };

//     const deleteMember = async (id: string) => {
//         if (confirm('Delete this member?')) {
//             await fetch(`/api/team/${id}`, { method: 'DELETE' });
//             fetchMembers();
//         }
//     };

//     useEffect(() => {
//         fetchMembers();
//     }, []);

//     return (
//         <div className="min-h-screen pb-12">


//             <div className="bg-white rounded p-6">
//                 <h1 className="text-2xl font-bold text-left mb-4">Team Management</h1>
//                 {/* <p className='mb-5 text-gray-500' >Lorem ipsum dolor sit amet consectetur adipisicing elit.</p> */}
//                 <TeamForm editing={editMember} onSave={fetchMembers} />
//             </div>

//             <div className="grid grid-cols-5 bg-white rounded p-6 mt-8">

//                 <h3 className='text-2xl font-bold text-left col-span-5 mb-5'>All Team Members</h3>

//                 {members.map((m: TeamMember) => (
//                     <div
//                         key={m._id}
//                         className="bg-white border border-gray-100 transition rounded-md p-3 hover:shadow-2xl"
//                     >
//                         <div className="flex flex-col items-center">

//                             <div className="relative w-28 h-28 mb-4">
//                                 <Image
//                                     src={`/uploads/${m.image}`}
//                                     alt={m.name}
//                                     fill
//                                     className="object-cover rounded-full border-4 border-red-500"
//                                 />
//                             </div>
//                             <h3 className="text-lg font-semibold  text-black">{m.name}</h3>
//                             <p className="text-red-600 font-medium">{m.position}</p>
//                             <p className="text-slate-600 text-sm text-center mt-2">{m.about}</p>
//                         </div>

//                         <div className="flex justify-center space-x-4 mt-4">
//                             <button
//                                 onClick={() => setEditMember(m)}
//                                 className="px-4 py-1 text-sm rounded border border-blue-500 text-blue-600 hover:bg-blue-50 transition"
//                             >
//                                 Edit
//                             </button>
//                             <button
//                                 onClick={() => deleteMember(m._id)}
//                                 className="px-4 py-1 text-sm rounded border border-red-500 text-red-600 hover:bg-red-50 transition"
//                             >
//                                 Delete
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }
'use client';
import { useEffect, useState } from 'react';
import TeamForm from './TeamForm';
import Image from 'next/image';

type TeamMember = {
    _id: string;
    name: string;
    position: string;
    about: string;
    image: string;
    socials: {
        facebook: string;
        linkedin: string;
        twitter: string;
        youtube: string;
    };
};

export default function TeamList() {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [editMember, setEditMember] = useState<TeamMember | null>(null);

    // For delete modal
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const fetchMembers = async () => {
        const res = await fetch('/api/team');
        const data = await res.json();
        setMembers(data.data);
        setEditMember(null);
    };

    const deleteMember = async () => {
        if (!deleteId) return;
        await fetch(`/api/team/${deleteId}`, { method: 'DELETE' });
        setShowDeleteModal(false);
        setDeleteId(null);
        fetchMembers();
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    return (
        <div className="min-h-screen pb-12">
            <div className="bg-white rounded p-6">
                <h1 className="text-2xl font-bold text-left mb-4">Team Management</h1>
                <TeamForm editing={editMember} onSave={fetchMembers} />
            </div>

            <div className="grid grid-cols-5 bg-white rounded p-6 mt-8">
                <h3 className='text-2xl font-bold text-left col-span-5 mb-5'>All Team Members</h3>

                {members.map((m: TeamMember) => (
                    <div
                        key={m._id}
                        className="bg-white border border-gray-100 transition rounded-md p-3 hover:shadow-2xl"
                    >
                        <div className="flex flex-col items-center">
                            <div className="relative w-28 h-28 mb-4">
                                <Image
                                    src={`/uploads/${m.image}`}
                                    alt={m.name}
                                    fill
                                    className="object-cover rounded-full border-4 border-red-500"
                                />
                            </div>
                            <h3 className="text-lg font-semibold text-black">{m.name}</h3>
                            <p className="text-red-600 font-medium">{m.position}</p>
                            <p className="text-slate-600 text-sm text-center mt-2">{m.about}</p>
                        </div>

                        <div className="flex justify-center space-x-4 mt-4">
                            <button
                                onClick={() => setEditMember(m)}
                                className="px-4 py-1 text-sm rounded border border-blue-500 text-blue-600 hover:bg-blue-50 transition"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => {
                                    setDeleteId(m._id);
                                    setShowDeleteModal(true);
                                }}
                                className="px-4 py-1 text-sm rounded border border-red-500 text-red-600 hover:bg-red-50 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-80">
                        <h2 className="text-lg font-bold text-black mb-4">Confirm Deletion</h2>
                        <p className="text-gray-700 mb-6">Are you sure you want to delete this team member?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={deleteMember}
                                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
