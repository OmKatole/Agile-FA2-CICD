import test from 'node:test';
import assert from 'node:assert/strict';
import { getInitials, getStudentStats, searchStudents, validateStudent } from '../src/studentManager.js';

const sampleStudents = [
  { name: 'Aarav Sharma', email: 'aarav@example.com', course: 'Information Technology', year: '3rd Year' },
  { name: 'Aarya Patil', email: 'aarya@example.com', course: 'Computer Engineering', year: '4th Year' },
  { name: 'Isha Kulkarni', email: 'isha@example.com', course: 'Information Technology', year: '4th Year' },
];

test('accepts a complete valid student record', () => {
  assert.deepEqual(validateStudent({ name: ' Aarya Patil ', email: 'aarya@example.com', course: 'IT', year: '2nd Year' }), []);
});

test('reports missing required fields', () => {
  const errors = validateStudent({ name: ' ', email: '', course: '', year: '' });
  assert.equal(errors.length, 4);
  assert.match(errors[0], /Full name is required/);
});

test('rejects an invalid email address', () => {
  assert.ok(validateStudent({ name: 'Aarav', email: 'not-an-email', course: 'IT', year: '1st Year' })
    .some((error) => error.includes('valid email')));
});

test('searches by name, email, course, and academic year without case sensitivity', () => {
  assert.equal(searchStudents(sampleStudents, 'AARAV').length, 1);
  assert.equal(searchStudents(sampleStudents, 'EXAMPLE.COM').length, 3);
  assert.equal(searchStudents(sampleStudents, 'information technology').length, 2);
  assert.equal(searchStudents(sampleStudents, '4th year').length, 2);
});

test('returns all students for an empty query', () => {
  assert.equal(searchStudents(sampleStudents, '  ').length, 3);
});

test('calculates student, unique-course, and final-year counts', () => {
  assert.deepEqual(getStudentStats(sampleStudents), { total: 3, courses: 2, finalYear: 2 });
});

test('creates initials from a student full name', () => {
  assert.equal(getInitials('  aarya patil  '), 'AP');
  assert.equal(getInitials('Madhu'), 'M');
  assert.equal(getInitials(''), '');
});
