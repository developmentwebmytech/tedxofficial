'use client';
import { useEffect, useState } from 'react';

type Enquiry = {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: string;
};

export default function ContactEnquiryPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);

  useEffect(() => {
    fetch('/api/contact')
      .then(res => res.json())
      .then(data => setEnquiries(data));
  }, []);

  return (
    <div className="p-4">
      

      <div className="bg-white shadow rounded overflow-x-auto p-4">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Contact Enquiries</h1>
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Subject</th>
              <th className="p-3">Message</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((enquiry) => (
              <tr key={enquiry._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{enquiry.name}</td>
                <td className="p-3 text-blue-600 underline">
                  <a href={`mailto:${enquiry.email}`}>{enquiry.email}</a>
                </td>
                <td className="p-3">{enquiry.subject || '-'}</td>
                <td className="p-3">{enquiry.message}</td>
                <td className="p-3">
                  {new Date(enquiry.createdAt).toLocaleDateString('en-GB', {
                    day: '2-digit', month: 'short', year: 'numeric'
                  })}
                </td>
              </tr>
            ))}
            {enquiries.length === 0 && (
              <tr>
                <td className="p-4 text-center text-gray-500" colSpan={5}>
                  No enquiries yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
