"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import "./ContactForm.css";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success("Message sent successfully !!");
        setFormData({ name: "", email: "", message: "" });
        router.push("/thank-you-page");
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      console.error("Error sending message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
        />
      </div>

      <button type="submit" disabled={isSubmitting} className="submit-button">
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
