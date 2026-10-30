import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Phone, Mail, Lock, ShieldCheck, UserPlus, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { Button } from '../components/common/Button';

export const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    password: '',
    role: 'ALUMNI',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  // Password strength logic
  const checkPasswordStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/\d/.test(pass)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pass)) score++;
    return score;
  };

  const passwordScore = checkPasswordStrength(formData.password);

  const validate = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (!/^[A-Za-z\s]{2,100}$/.test(formData.name)) {
      newErrors.name = 'Name must be 2-100 alphabetic characters & spaces';
    }

    // Phone validation
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be exactly 10 digits';
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (passwordScore < 4) {
      newErrors.password = 'Min 8 chars with uppercase, lowercase, digit, and special char';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;

    setLoading(true);
    try {
      await register({
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });
      navigate('/dashboard');
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        (err.code === 'ERR_NETWORK' || !err.response
          ? 'Backend server connection failed (http://localhost:8080). Please make sure your Spring Boot backend and MySQL database are running.'
          : 'Registration failed. Please check inputs.');
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  const roleOptions = [
    { value: 'ALUMNI', label: 'Alumni Member' },
    { value: 'MENTOR', label: 'Alumni Mentor' },
    { value: 'CHAPTER_LEAD', label: 'Chapter Lead' },
    { value: 'ALUMNI_RELATIONS_OFFICE', label: 'Alumni Relations Officer' },
    { value: 'GUEST', label: 'Guest / Student' },
    { value: 'ADMIN', label: 'System Administrator' },
  ];

  return (
    <div className="glass-panel p-8 rounded-3xl shadow-2xl border border-slate-800">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white tracking-tight">Create Nexus Account</h2>
        <p className="text-xs text-slate-400 mt-1">Join the global alumni community & professional ecosystem</p>
      </div>

      {serverError && (
        <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{serverError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          placeholder="e.g. Gopi Kumar"
          icon={User}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Phone Number"
            placeholder="10-digit number"
            icon={Phone}
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value.replace(/\D/g, '').slice(0, 10) })}
            error={errors.phoneNumber}
            required
          />

          <Select
            label="Account Role"
            options={roleOptions}
            icon={ShieldCheck}
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          />
        </div>

        <Input
          label="Email Address"
          type="email"
          placeholder="gopi@example.com"
          icon={Mail}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
          required
        />

        <div>
          <Input
            label="Password"
            type="password"
            placeholder="Gopi@1234"
            icon={Lock}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            error={errors.password}
            required
          />

          {/* Password Strength Feedback Meter */}
          {formData.password && (
            <div className="mt-2 space-y-1">
              <div className="flex gap-1 h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-full flex-1 rounded-full transition-all ${
                      i < passwordScore
                        ? passwordScore >= 4
                          ? 'bg-emerald-500'
                          : passwordScore >= 3
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                        : 'bg-slate-800'
                    }`}
                  />
                ))}
              </div>
              <p className="text-[11px] text-slate-400">
                Strength:{' '}
                <span className="font-semibold text-slate-200">
                  {passwordScore >= 5
                    ? 'Strong'
                    : passwordScore >= 3
                    ? 'Medium'
                    : 'Weak (Requires min 8 chars, uppercase, lowercase, digit, & special char)'}
                </span>
              </p>
            </div>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full mt-4"
          isLoading={loading}
          icon={UserPlus}
        >
          Complete Registration
        </Button>
      </form>

      <div className="mt-6 text-center text-xs text-slate-400 pt-4 border-t border-slate-800">
        Already registered?{' '}
        <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-bold">
          Sign In Here
        </Link>
      </div>
    </div>
  );
};
