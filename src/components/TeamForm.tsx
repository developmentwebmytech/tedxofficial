'use client';

import { useEffect, useState, ChangeEvent, FormEvent } from 'react';

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

type TeamFormProps = {
  editing: TeamMember | null;
  onSave: () => void;
};

export default function TeamForm({ editing, onSave }: TeamFormProps) {
  const [image, setImage] = useState<File | null>(null);

  const [form, setForm] = useState({
    name: '',
    position: '',
    about: '',
    facebook: '',
    linkedin: '',
    twitter: '',
    youtube: '',
    existingImage: '',
  });

  useEffect(() => {
    if (editing) {
      setForm({
        name: editing.name,
        position: editing.position,
        about: editing.about,
        facebook: editing.socials.facebook,
        linkedin: editing.socials.linkedin,
        twitter: editing.socials.twitter,
        youtube: editing.socials.youtube,
        existingImage: editing.image,
      });
    }
  }, [editing]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(form).forEach(([key, val]) => {
      formData.append(key, val);
    });

    if (image) formData.append('image', image);

    const res = await fetch(editing ? `/api/team/${editing._id}` : '/api/team', {
      method: editing ? 'PUT' : 'POST',
      body: formData,
    });

    if (res.ok) {
      setImage(null);
      setForm({
        name: '',
        position: '',
        about: '',
        facebook: '',
        linkedin: '',
        twitter: '',
        youtube: '',
        existingImage: '',
      });
      onSave();
    } else {
      console.error('Error submitting form');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white space-y-6"
    >
      {/* <h3 className="text-xl font-semibold text-black mb-2">
        {editing ? 'Edit Team Member' : 'Add Team Member'}
      </h3> */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="bg-slate-100 p-3 rounded border border-slate-300 focus:outline-red-500"
          required
        />
        <input
          name="position"
          value={form.position}
          onChange={handleChange}
          placeholder="Position"
          className="bg-slate-100 p-3 rounded border border-slate-300 focus:outline-red-500"
          required
        />
        <input
          name="facebook"
          value={form.facebook}
          onChange={handleChange}
          placeholder="Facebook URL"
          className="bg-slate-100 p-3 rounded border border-slate-300"
        />
        <input
          name="linkedin"
          value={form.linkedin}
          onChange={handleChange}
          placeholder="LinkedIn URL"
          className="bg-slate-100 p-3 rounded border border-slate-300"
        />
        <input
          name="twitter"
          value={form.twitter}
          onChange={handleChange}
          placeholder="Twitter URL"
          className="bg-slate-100 p-3 rounded border border-slate-300"
        />
        <input
          name="youtube"
          value={form.youtube}
          onChange={handleChange}
          placeholder="YouTube URL"
          className="bg-slate-100 p-3 rounded border border-slate-300"
        />
      </div>

      <textarea
        name="about"
        value={form.about}
        onChange={handleChange}
        placeholder="About"
        className="bg-slate-100 p-3 rounded border border-slate-300 w-full h-28 resize-none"
        required
      />

      <div>
        <label className="block text-slate-600 mb-1 font-medium">Upload Image</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          accept="image/*"
          className="block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0 file:text-sm file:font-semibold
              file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
        />
      </div>

      <button
        type="submit"
        className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition font-semibold"
      >
        {editing ? 'Update Member' : 'Add Member'}
      </button>
    </form>
  );
}

