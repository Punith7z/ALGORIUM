const express = require('express');
const router  = express.Router();
const Student = require('../models/student');

// ── GET /login ───────────────────────────────────────────────
router.get('/login', (req, res) => {
  if (req.session.isLoggedIn) return res.redirect('/player');
  res.render('listings/login', { error: null, formData: {} });
});

// ── POST /login ──────────────────────────────────────────────
router.post('/login', async (req, res) => {
  console.log('POST /login hit');
  console.log('Body:', req.body);

  const { name, email } = req.body;
  const cleanName  = name.trim();
  const cleanEmail = email.trim().toLowerCase();

  try {
    console.log('Searching for:', cleanName, cleanEmail);
    const count = await Student.countDocuments();
    console.log('Total students in DB:', count);

    const student = await Student.findOne({
      name:  { $regex: new RegExp(`^${cleanName}$`, 'i') },
      email: { $regex: new RegExp(`^${cleanEmail}$`, 'i') }
    });

    if (!student) {
      return res.render('listings/login', {
        error: 'Invalid name or email. Please check your details.',
        formData: { name: cleanName, email: cleanEmail }
      });
    }

    req.session.isLoggedIn = true;
    req.session.student    = {
      name:  student.name,
      email: student.email
    };

    res.redirect('/player');

  } catch (err) {
    console.error('Login error FULL:', err);
    res.render('listings/login', {
      error: 'Something went wrong. Please try again.',
      formData: { name: cleanName, email: cleanEmail }
    });
  }
}); // ← this was missing

// ── GET /logout ──────────────────────────────────────────────
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

module.exports = router;