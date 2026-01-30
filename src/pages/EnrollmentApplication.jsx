import React, { useRef, useState } from "react";
import { jsPDF } from "jspdf";

import bgPattern from "../assets/bg-pattern2.png";

const EnrollmentApplication = () => {
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const form = formRef.current;

    if (!form.date.value) newErrors.date = "Date is required";
    if (!form.fullName.value.trim()) newErrors.fullName = "Name is required";
    if (!form.age.value) newErrors.age = "Age is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.value.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(form.email.value)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.whatsapp.value.trim())
      newErrors.whatsapp = "WhatsApp is required";
    if (!form.occupation.value.trim())
      newErrors.occupation = "Occupation is required";

    if (!form.cohort.value) newErrors.cohort = "Please select a cohort";

    if (!form.signature.value.trim())
      newErrors.signature = "Signature is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      // Scroll to first error
      const firstKey = Object.keys(newErrors)[0];
      const el = form.elements[firstKey];
      if (el) {
        (el.length ? el[0] : el).scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    if (formRef.current) {
      const scaleQuestions = [
        "How often do you SPEAK English within your social circle?",
        "How confident are you in SPEAKING English?",
        "How comfortable are you in English PRONUNCIATION?",
        "Do you watch or listen to English TELEVISION or MUSIC?",
      ];

      let message = "New Enrollment Application\n\n";

      const inputs = formRef.current.querySelectorAll(
        "input, textarea, select",
      );

      inputs.forEach((input) => {
        if (
          (input.type === "radio" || input.type === "checkbox") &&
          !input.checked
        )
          return;

        let label = "";
        let val = input.value;

        if (input.name && input.name.startsWith("scale-")) {
          const idx = parseInt(input.name.split("-")[1]);
          label = scaleQuestions[idx] || input.name;

          if (
            input.nextElementSibling &&
            input.nextElementSibling.tagName === "SPAN"
          ) {
            val = input.nextElementSibling.innerText;
          }
        } else if (input.name === "cohort") {
          label = "Selected Cohort";
          if (
            input.nextElementSibling &&
            input.nextElementSibling.tagName === "H3"
          ) {
            val = input.nextElementSibling.innerText;
          }
        } else if (
          input.parentElement &&
          input.parentElement.tagName === "LABEL"
        ) {
          const span = input.parentElement.querySelector("span");
          if (span) {
            label = span.innerText;
          } else {
            label = input.parentElement.innerText.replace(val, "").trim();
          }
          val = "Yes";
        } else {
          if (
            input.previousElementSibling &&
            input.previousElementSibling.tagName === "LABEL"
          ) {
            label = input.previousElementSibling.innerText;
          } else if (
            input.parentElement.previousElementSibling &&
            input.parentElement.previousElementSibling.tagName === "LABEL"
          ) {
            label = input.parentElement.previousElementSibling.innerText;
          }

          if (!label || label.length > 50) {
            label = input.getAttribute("placeholder") || input.name || "Field";
          }
        }

        label = label.replace(/:/g, "").trim();

        if (label && val) {
          message += `${label}: ${val}\n`;
        }
      });

      // Generate PDF
      const doc = new jsPDF();
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);

      // Title
      doc.setFontSize(16);
      doc.text("Baja English Course - Enrollment Application", 105, 20, {
        align: "center",
      });
      doc.setFontSize(11);

      // Content
      const splitText = doc.splitTextToSize(message, 180);
      let y = 40;
      const pageHeight = doc.internal.pageSize.height;

      splitText.forEach((line) => {
        if (y > pageHeight - 20) {
          doc.addPage();
          y = 20;
        }
        doc.text(line, 15, y);
        y += 7;
      });

      const pdfBase64 = doc.output("datauristring").split(",")[1];

      try {
        const response = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subject: "Baja English Course",
            message:
              "A new enrollment application has been submitted. Please find the details in the attached PDF.",
            attachments: [
              {
                filename: "Enrollment_Application.pdf",
                content: pdfBase64,
              },
            ],
          }),
        });

        if (!response.ok) {
          const text = await response.text();
          let errorMessage = "Failed to send email";
          try {
            const errorData = JSON.parse(text);
            errorMessage = errorData.message || errorMessage;
          } catch {
            console.error("Failed to parse error response JSON:", text);
            errorMessage = `Server Error: ${response.status} ${response.statusText}`;
          }
          throw new Error(errorMessage);
        }

        console.log("Email sent successfully!");

        setIsSubmitted(true);
        window.scrollTo(0, 0);
      } catch (emailError) {
        console.error("Email sending error:", emailError);
        alert(
          `Failed to send application. ${emailError.message || "Please try again."}`,
        );
      }
    }
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen relative font-['Inter'] text-[#333] flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-6 py-12 md:px-12 relative z-10 text-center">
          <div className="bg-white/90 p-12 rounded-lg shadow-xl border-t-8 border-[#8F232C]">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-[#8F232C] mb-4">
              Application Submitted Successfully!
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for enrolling in the Baja English Course. Your
              application has been received and sent to our team for review.
            </p>
            {/* <button
              onClick={() => window.location.reload()}
              className="bg-[#8F232C] text-white font-bold py-3 px-8 rounded hover:bg-[#721c23] transition-colors"
            >
              Return to Form
            </button> */}
            <button
              onClick={() => {
                setIsSubmitted(false);
                setErrors({});
                formRef.current?.reset();
                window.scrollTo(0, 0);
              }}
              className="bg-[#8F232C] text-white font-bold py-3 px-8 rounded hover:bg-[#721c23] transition-colors"
            >
              Return to Form
            </button>
          </div>
        </div>
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
          <img
            src={bgPattern}
            alt="Background Pattern"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen relative font-['Inter'] text-[#333]">
      {/* Background */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <img
          src={bgPattern}
          alt="Background Pattern"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main Container with RED border around everything */}
      <div className="max-w-6xl mx-auto px-6 py-12 md:px-12 relative z-10">
        <div className="border-4 border-[#8F232C] rounded-lg overflow-hidden">
          {" "}
          {/* RED BORDER HERE */}
          {/* Header - Now inside the border */}
          {/* <div className="text-center py-10 bg-white">
            <h1 className="text-4xl md:text-5xl font-bold text-[#8F232C] uppercase mb-3 tracking-wide">
              Enrollment Application
            </h1>
            <p className="text-xl text-gray-700 font-medium">
              Baja English Course
            </p>
          </div> */}
          <div className="text-center py-10 bg-white">
            <h1 className="text-4xl md:text-5xl font-bold text-[#8F232C] mb-3 tracking-wide underline">
              Enrollment Application
            </h1>
            <p className="text-xl text-gray-700 font-medium italic">
              (Baja English Course)
            </p>
          </div>
          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-white p-6 md:p-12 space-y-12"
          >
            {/* Section 1: Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-8">
              {/* Row 1 */}
              <div className="col-span-1 md:col-span-1">
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  className={`w-full border-b outline-none py-2 transition-colors bg-transparent ${
                    errors.date
                      ? "border-red-500"
                      : "border-gray-300 focus:border-[#8F232C]"
                  }`}
                />
                {errors.date && (
                  <p className="text-red-500 text-xs mt-1">{errors.date}</p>
                )}
              </div>

              <div className="col-span-1 md:col-span-1">
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  className={`w-full border-b outline-none py-2 transition-colors bg-transparent ${
                    errors.fullName
                      ? "border-red-500"
                      : "border-gray-300 focus:border-[#8F232C]"
                  }`}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Row 2 */}
              <div className="col-span-1 md:col-span-1">
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  min="1"
                  className={`w-full border-b outline-none py-2 transition-colors bg-transparent ${
                    errors.age
                      ? "border-red-500"
                      : "border-gray-300 focus:border-[#8F232C]"
                  }`}
                />
                {errors.age && (
                  <p className="text-red-500 text-xs mt-1">{errors.age}</p>
                )}
              </div>

              <div className="col-span-1 md:col-span-1">
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className={`w-full border-b outline-none py-2 transition-colors bg-transparent ${
                    errors.email
                      ? "border-red-500"
                      : "border-gray-300 focus:border-[#8F232C]"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Row 3 */}
              <div className="col-span-1 md:col-span-1">
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  WhatsApp
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  className={`w-full border-b outline-none py-2 transition-colors bg-transparent ${
                    errors.whatsapp
                      ? "border-red-500"
                      : "border-gray-300 focus:border-[#8F232C]"
                  }`}
                />
                {errors.whatsapp && (
                  <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>
                )}
              </div>

              <div className="col-span-1 md:col-span-1">
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Business or School Name
                </label>
                <input
                  type="text"
                  className="w-full border-b border-gray-300 focus:border-[#8F232C] outline-none py-2 transition-colors bg-transparent"
                />
              </div>

              {/* Row 4 - Full width */}
              <div className="col-span-1 md:col-span-3">
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  What is your occupation?
                </label>
                <input
                  type="text"
                  name="occupation"
                  className={`w-full border-b outline-none py-2 transition-colors bg-transparent ${
                    errors.occupation
                      ? "border-red-500"
                      : "border-gray-300 focus:border-[#8F232C]"
                  }`}
                />
                {errors.occupation && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.occupation}
                  </p>
                )}
              </div>
            </div>

            {/* Section 2: Current English Skills */}
            <div>
              {/* <h2 className="text-2xl font-bold text-[#8F232C] mb-2 border-b-2 border-[#8F232C] inline-block pb-1">
                Current English Skills
              </h2>
              <p className="mb-6 text-gray-600">
                Place a check next to the box that best describes your current
                English skills
              </p> */}
              <div className="text-center">
                <h2 className="text-2xl font-bold text-[#8F232C] mb-2 border-b-2 border-[#8F232C] inline-block pb-1">
                  Current English Skills
                </h2>
              </div>

              <p className="mb-6 text-gray-600 text-center">
                Place a check next to the box that best describes your current
                English skills
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Speaking */}
                <div className="space-y-3">
                  <h3 className="font-bold text-lg text-gray-800">Speaking</h3>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-1 w-5 h-5 text-[#8F232C] rounded border-gray-300 focus:ring-[#8F232C]"
                    />
                    <span className="text-gray-700">
                      I know a few words and short phrases{" "}
                      <span className="italic">(Beginner)</span>
                    </span>
                  </label>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-1 w-5 h-5 text-[#8F232C] rounded border-gray-300 focus:ring-[#8F232C]"
                    />
                    <span className="text-gray-700">
                      I can have short conversations and ask questions{" "}
                      <span className="italic">(Intermediate)</span>
                    </span>
                  </label>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-1 w-5 h-5 text-[#8F232C] rounded border-gray-300 focus:ring-[#8F232C]"
                    />
                    <span className="text-gray-700">
                      I speak fluently and confidently in most situations{" "}
                      <span className="italic">(Advanced)</span>
                    </span>
                  </label>
                </div>

                {/* Writing */}
                <div className="space-y-3">
                  <h3 className="font-bold text-lg text-gray-800">Writing</h3>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-1 w-5 h-5 text-[#8F232C] rounded border-gray-300 focus:ring-[#8F232C]"
                    />
                    <span className="text-gray-700">
                      I can write my name and simple sentences{" "}
                      <span className="italic">(Beginner)</span>
                    </span>
                  </label>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-1 w-5 h-5 text-[#8F232C] rounded border-gray-300 focus:ring-[#8F232C]"
                    />
                    <span className="text-gray-700">
                      I can write short paragraphs or messages{" "}
                      <span className="italic">(Intermediate)</span>
                    </span>
                  </label>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-1 w-5 h-5 text-[#8F232C] rounded border-gray-300 focus:ring-[#8F232C]"
                    />
                    <span className="text-gray-700">
                      I can write emails, stories, or essays{" "}
                      <span className="italic">(Advanced)</span>
                    </span>
                  </label>
                </div>

                {/* Listening */}
                <div className="space-y-3">
                  <h3 className="font-bold text-lg text-gray-800">Listening</h3>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-1 w-5 h-5 text-[#8F232C] rounded border-gray-300 focus:ring-[#8F232C]"
                    />
                    <span className="text-gray-700">
                      I understand very simple words and phrases{" "}
                      <span className="italic">(Beginner)</span>
                    </span>
                  </label>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-1 w-5 h-5 text-[#8F232C] rounded border-gray-300 focus:ring-[#8F232C]"
                    />
                    <span className="text-gray-700">
                      I understand general conversation but not everything{" "}
                      <span className="italic">(Intermediate)</span>
                    </span>
                  </label>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-1 w-5 h-5 text-[#8F232C] rounded border-gray-300 focus:ring-[#8F232C]"
                    />
                    <span className="text-gray-700">
                      I understand movies, news, and fast conversation{" "}
                      <span className="italic">(Advanced)</span>
                    </span>
                  </label>
                </div>

                {/* Reading */}
                <div className="space-y-3">
                  <h3 className="font-bold text-lg text-gray-800">Reading</h3>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-1 w-5 h-5 text-[#8F232C] rounded border-gray-300 focus:ring-[#8F232C]"
                    />
                    <span className="text-gray-700">
                      I can read simple words and signs{" "}
                      <span className="italic">(Beginner)</span>
                    </span>
                  </label>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-1 w-5 h-5 text-[#8F232C] rounded border-gray-300 focus:ring-[#8F232C]"
                    />
                    <span className="text-gray-700">
                      I can read short texts and understand the meaning{" "}
                      <span className="italic">(Intermediate)</span>
                    </span>
                  </label>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-1 w-5 h-5 text-[#8F232C] rounded border-gray-300 focus:ring-[#8F232C]"
                    />
                    <span className="text-gray-700">
                      I can read books, articles, or newspapers{" "}
                      <span className="italic">(Advanced)</span>
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Section 3: Your Goals */}
            <div>
              {/* <h2 className="text-2xl font-bold text-[#8F232C] mb-2 border-b-2 border-[#8F232C] inline-block pb-1">
                Your Goals
              </h2>
              <p className="mb-6 text-gray-600">
                What would you like to improve? (Check all that apply)
              </p> */}
              <div className="text-center">
                <h2 className="text-2xl font-bold text-[#8F232C] mb-2 border-b-2 border-[#8F232C] inline-block pb-1">
                  Your Goals
                </h2>
              </div>

              <p className="mb-6 text-gray-600 text-center">
                What would you like to improve? (Check all that apply)
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  "Speaking",
                  "Listening",
                  "Reading",
                  "Writing",
                  "Confidence",
                  "Job or School English",
                  "Everyday English",
                ].map((goal) => (
                  <label
                    key={goal}
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="w-5 h-5 text-[#8F232C] rounded border-gray-300 focus:ring-[#8F232C]"
                    />
                    <span className="text-gray-700">{goal}</span>
                  </label>
                ))}
                <label className="flex items-center space-x-3 cursor-pointer col-span-2 md:col-span-4">
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-[#8F232C] rounded border-gray-300 focus:ring-[#8F232C]"
                  />
                  <span className="text-gray-700">Other:</span>
                  <input
                    type="text"
                    className="flex-1 border-b border-gray-300 focus:border-[#8F232C] outline-none py-1 mx-2"
                  />
                </label>
              </div>
            </div>

            {/* Section 4: Short Writing Questions */}
            <div>
              {/* <h2 className="text-2xl font-bold text-[#8F232C] mb-6 border-b-2 border-[#8F232C] inline-block pb-1">
                Short Writing Questions
              </h2>
              <p className="text-sm text-gray-500 mb-6 italic">
                Please answer the following in English. Use full sentences if
                you can.
              </p> */}
              <div className="text-center">
                <h2 className="text-2xl font-bold text-[#8F232C] mb-6 border-b-2 border-[#8F232C] inline-block pb-1">
                  Short Writing Questions
                </h2>
              </div>

              <p className="text-sm text-gray-500 mb-6 italic text-center">
                Please answer the following in English. Use full sentences if
                you can.
              </p>

              <div className="space-y-8">
                {[
                  "What do you do during the day?",
                  "What is your favorite food and why?",
                  "Why do you want to improve your English?",
                  "What do you do on the weekends?",
                  "What is your favorite Netflix movie or tv show?",
                ].map((question) => (
                  <div key={question}>
                    <label className="block text-lg font-medium text-gray-800 mb-2">
                      {question}
                    </label>
                    <textarea
                      rows="3"
                      className="w-full border-b border-gray-300 focus:border-[#8F232C] outline-none py-2 resize-none bg-transparent transition-colors"
                    ></textarea>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 5: Self Assessment Scale */}
            <div>
              {/* <h2 className="text-2xl font-bold text-[#8F232C] mb-6 border-b-2 border-[#8F232C] inline-block pb-1">
                Self Assessment
              </h2>
              <p className="mb-8 text-gray-600">
                For each question, choose the answer that best describes you
                using a scale from 1
                 to 10
              </p> */}
              <div className="text-center">
                <h2 className="text-2xl font-bold text-[#8F232C] mb-6 border-b-2 border-[#8F232C] inline-block pb-1">
                  Self Assessment
                </h2>
              </div>

              <p className="mb-8 text-gray-600 text-center">
                For each question, choose the answer that best describes you
                using a scale from 1 to 10
              </p>

              <div className="space-y-8">
                {[
                  "How often do you SPEAK English within your social circle?",
                  "How confident are you in SPEAKING English?",
                  "How comfortable are you in English PRONUNCIATION?",
                  "Do you watch or listen to English TELEVISION or MUSIC?",
                ].map((question, idx) => (
                  <div key={idx} className="bg-gray-50 p-6 rounded-lg">
                    <p className="font-bold text-gray-800 mb-4">{question}</p>
                    <div className="flex flex-wrap justify-between items-center gap-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <div key={num} className="flex flex-col items-center">
                          <input
                            type="radio"
                            name={`scale-${idx}`}
                            className="w-5 h-5 text-[#8F232C] focus:ring-[#8F232C] border-gray-300"
                          />
                          <span className="text-xs mt-1 text-gray-500">
                            {num}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 6: Course Schedule & Program Overview */}
            <div>
              {/* <h2 className="text-2xl font-bold text-[#8F232C] mb-6 border-b-2 border-[#8F232C] inline-block pb-1">
                Course Schedule
              </h2> */}
              <div className="text-center">
                <h2 className="text-2xl font-bold text-[#8F232C] mb-6 border-b-2 border-[#8F232C] inline-block pb-1">
                  Course Schedule
                </h2>
              </div>

              <div className="bg-[#fdf2f2] p-6 rounded-lg mb-8 border border-[#ebcccc]">
                <h3 className="text-xl font-bold text-[#8F232C] mb-3">
                  Program Overview
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Students should select the In-Person or Online option that
                  best matches their schedule. Each class consists of 5
                  students, with 15 students per cohort. We meet twice per week
                  for 2 hours each session.
                </p>
              </div>
              {errors.cohort && (
                <div className="text-center mb-4">
                  <p className="text-red-500 font-bold">{errors.cohort}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* In-Person Cohort */}
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow bg-white">
                  <div className="flex items-center mb-4">
                    <input
                      type="radio"
                      name="cohort"
                      className="w-6 h-6 text-[#8F232C] focus:ring-[#8F232C] mr-3"
                    />
                    <h3 className="text-xl font-bold text-gray-800">
                      In-Person Cohort
                    </h3>
                  </div>
                  <p className="text-[#8F232C] font-semibold mb-3">
                    Tuesday & Sunday
                  </p>
                  <ul className="space-y-2 text-gray-700 mb-6">
                    <li>11:00 AM – 1:00 PM</li>
                    <li>3:00 PM – 5:00 PM</li>
                    <li>7:00 PM – 9:00 PM (English Business)</li>
                  </ul>
                  <div className="text-sm text-gray-600 space-y-2 border-t pt-4">
                    <p>
                      <strong>* Club House:</strong> Boulevard Viñas del Mar,
                      Real del Mar, Tijuana, MX 22564
                    </p>
                    <p>
                      <strong>* Café Casa París:</strong> Blvrd Gral Rodolfo
                      Sánchez Taboada 605, Tijuana, MX 22000
                    </p>
                  </div>
                </div>

                {/* Online Cohort */}
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow bg-white">
                  <div className="flex items-center mb-4">
                    <input
                      type="radio"
                      name="cohort"
                      className="w-6 h-6 text-[#8F232C] focus:ring-[#8F232C] mr-3"
                    />
                    <h3 className="text-xl font-bold text-gray-800">
                      Online Cohort
                    </h3>
                  </div>
                  <p className="text-[#8F232C] font-semibold mb-3">
                    Monday & Saturday
                  </p>
                  <ul className="space-y-2 text-gray-700 mb-6">
                    <li>11:00 AM – 1:00 PM</li>
                    <li>3:00 PM – 5:00 PM</li>
                    <li>7:00 PM – 9:00 PM (English Business)</li>
                  </ul>
                  <div className="text-sm text-gray-600 space-y-2 border-t pt-4">
                    <p>
                      <strong>* Note:</strong> All online classes will be
                      conducted via Zoom. Link will be provided upon enrollment.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 7: Agreement & Submit */}
            <div className="pt-8 border-t border-gray-300">
              <div className="mb-8">
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="signature"
                  className={`w-full md:w-1/2 border-b outline-none py-2 transition-colors bg-transparent ${
                    errors.signature
                      ? "border-red-500"
                      : "border-gray-300 focus:border-[#8F232C]"
                  }`}
                  placeholder="Sign here..."
                />
                {errors.signature && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.signature}
                  </p>
                )}
              </div>

              <p className="text-gray-600 italic text-sm mb-8">
                By selecting a cohort and class schedule, I acknowledge that I
                am committing to attending all sessions consistently. I
                understand that cohort changes may be accommodated only if space
                permits. I also agree to provide at least 48 hours’ notice for
                any excused absences; all sessions start and end on time.
              </p>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#8F232C] text-white font-bold py-4 px-12 rounded shadow-md hover:bg-[#721c23] transition-colors uppercase tracking-widest text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Background decoration/overlay if needed */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <img
          src={bgPattern}
          alt="Background Pattern"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default EnrollmentApplication;