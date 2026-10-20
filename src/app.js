import { getInitials, getStudentStats, searchStudents, validateStudent } from './studentManager.js';

const STORAGE_KEY = 'studenthub.records.v1';
const demoStudents = [
  { id: 'demo-1', name: 'Aarav Sharma', email: 'aarav@example.com', course: 'Information Technology', year: '3rd Year' },
  { id: 'demo-2', name: 'Aarya Patil', email: 'aarya@example.com', course: 'Computer Engineering', year: '4th Year' },
  { id: 'demo-3', name: 'Rohan Deshmukh', email: 'rohan@example.com', course: 'Information Technology', year: '2nd Year' },
  { id: 'demo-4', name: 'Isha Kulkarni', email: 'isha@example.com', course: 'Artificial Intelligence and Data Science', year: '4th Year' },
];

const form = document.querySelector('#student-form');
const searchInput = document.querySelector('#student-search');
const rows = document.querySelector('#student-rows');
const emptyState = document.querySelector('#empty-state');
const message = document.querySelector('#form-message');
const toast = document.querySelector('#toast');
let students = loadStudents();
let toastTimeout;

function loadStudents() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {return parsed;}
    }
  } catch {
    // If browser storage is unavailable or corrupted, use demo data for this session.
  }
  return demoStudents.map((student) => ({ ...student }));
}

function saveStudents() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  } catch {
    showToast('Browser storage is unavailable. Changes may not persist.');
  }
}

function showToast(text) {
  toast.textContent = text;
  toast.classList.add('show');
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove('show'), 2400);
}

function renderStats() {
  const stats = getStudentStats(students);
  document.querySelector('#total-students').textContent = stats.total;
  document.querySelector('#total-courses').textContent = stats.courses;
  document.querySelector('#final-year-students').textContent = stats.finalYear;
}

function createCell(className, content) {
  const cell = document.createElement('td');
  if (className) {cell.className = className;}
  if (content instanceof Node) {cell.append(content);}
  else {cell.textContent = content;}
  return cell;
}

function renderStudents() {
  const filteredStudents = searchStudents(students, searchInput.value);
  rows.replaceChildren();
  filteredStudents.forEach((student) => {
    const row = document.createElement('tr');
    const identity = document.createElement('div');
    identity.className = 'student-name';
    const avatar = document.createElement('span');
    avatar.className = 'avatar';
    avatar.textContent = getInitials(student.name) || '?';
    const identityText = document.createElement('div');
    const name = document.createElement('div');
    name.textContent = student.name;
    const email = document.createElement('div');
    email.className = 'email';
    email.textContent = student.email;
    identityText.append(name, email);
    identity.append(avatar, identityText);
    row.append(createCell('', identity), createCell('course-name', student.course));
    const yearCell = createCell('', student.year);
    const yearTag = document.createElement('span');
    yearTag.className = 'year-tag';
    yearTag.textContent = student.year;
    yearCell.replaceChildren(yearTag);
    row.replaceChildren(createCell('', identity), createCell('course-name', student.course), yearCell);
    const actionCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'delete-button';
    deleteButton.textContent = 'Delete';
    deleteButton.dataset.deleteId = student.id;
    deleteButton.setAttribute('aria-label', `Delete ${student.name}`);
    actionCell.append(deleteButton);
    row.append(actionCell);
    rows.append(row);
  });
  emptyState.hidden = filteredStudents.length !== 0;
  document.querySelector('#visible-count').textContent = `${filteredStudents.length} record${filteredStudents.length === 1 ? '' : 's'}`;
  renderStats();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const student = {
    name: String(formData.get('name') ?? '').trim(),
    email: String(formData.get('email') ?? '').trim(),
    course: String(formData.get('course') ?? '').trim(),
    year: String(formData.get('year') ?? '').trim(),
  };
  const errors = validateStudent(student);
  if (errors.length) {
    message.textContent = errors[0];
    return;
  }
  const duplicateEmail = students.some((saved) => saved.email.toLowerCase() === student.email.toLowerCase());
  if (duplicateEmail) {
    message.textContent = 'A student with this email already exists.';
    return;
  }
  student.id = typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : `student-${Date.now()}`;
  students = [student, ...students];
  saveStudents();
  form.reset();
  message.textContent = '';
  renderStudents();
  showToast('Student added successfully.');
});

searchInput.addEventListener('input', renderStudents);
rows.addEventListener('click', (event) => {
  const button = event.target.closest('[data-delete-id]');
  if (!button) {return;}
  const student = students.find((item) => item.id === button.dataset.deleteId);
  students = students.filter((item) => item.id !== button.dataset.deleteId);
  saveStudents();
  renderStudents();
  if (student) {showToast(`${student.name} was removed.`);}
});

renderStudents();
