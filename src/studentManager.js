/** Pure student-management functions, separated so they can be tested automatically. */
export function validateStudent(student) {
  const errors = [];
  const name = String(student?.name ?? '').trim();
  const email = String(student?.email ?? '').trim();
  const course = String(student?.course ?? '').trim();
  const year = String(student?.year ?? '').trim();

  if (!name) {errors.push('Full name is required.');}
  if (!email) {errors.push('Email address is required.');}
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {errors.push('Enter a valid email address.');}
  if (!course) {errors.push('Please select a course.');}
  if (!['1st Year', '2nd Year', '3rd Year', '4th Year'].includes(year)) {
    errors.push('Please select a valid academic year.');
  }
  return errors;
}

export function searchStudents(students, query) {
  const normalizedQuery = String(query ?? '').trim().toLowerCase();
  if (!normalizedQuery) {return [...students];}
  return students.filter((student) => [student.name, student.email, student.course, student.year]
    .some((value) => String(value ?? '').toLowerCase().includes(normalizedQuery)));
}

export function getStudentStats(students) {
  return {
    total: students.length,
    courses: new Set(students.map((student) => student.course).filter(Boolean)).size,
    finalYear: students.filter((student) => student.year === '4th Year').length,
  };
}

export function getInitials(name) {
  return String(name ?? '').trim().split(/\s+/).filter(Boolean).slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase()).join('');
}
