# 🧪 Onboarding System Testing Guide

This guide will help you test the newly implemented onboarding wizard and checklist system.

## 📋 Pre-Test Checklist

Before testing, ensure:
- [ ] Application is running in development mode (`bun run dev`)
- [ ] You have access to the browser console
- [ ] You're logged in as a user

---

## 🎯 Test Scenarios

### **Test 1: First-Time User Experience**

**Goal**: Verify welcome wizard appears for new users

**Steps**:
1. **Sign up with a new account** OR **Reset onboarding** using the test helper panel
2. **Expected**: Welcome wizard appears automatically
3. Click through all 5 steps of the wizard
4. Verify:
   - ✅ Personalized greeting with your name
   - ✅ Feature highlights on step 1
   - ✅ Progress indicators (dots) at bottom
   - ✅ "Skip" button works
   - ✅ "Back" button works (after step 1)
   - ✅ "Next" button advances steps
   - ✅ Final step says "Get Started"
5. Click "Get Started"
6. **Expected**: Wizard closes, checklist appears in bottom-right

**Pass Criteria**: ✅ All animations smooth, no errors in console

---

### **Test 2: Onboarding Checklist Display**

**Goal**: Verify checklist shows and functions correctly

**Steps**:
1. After closing welcome wizard, locate checklist in bottom-right corner
2. Verify checklist shows:
   - ✅ "Getting Started" title
   - ✅ Progress bar (X of 5 completed with %)
   - ✅ 5 unchecked steps (or some checked if you already did actions)
   - ✅ Collapse/expand button (chevron icon)
   - ✅ Dismiss button (X icon)
3. Click collapse button
4. **Expected**: Checklist minimizes, only showing header
5. Click expand button
6. **Expected**: Checklist expands again
7. Try dismissing the checklist
8. **Expected**: Checklist disappears with animation

**Pass Criteria**: ✅ Smooth animations, all buttons work

---

### **Test 3: Auto-Complete - Create Organization**

**Goal**: Verify organization creation auto-completes first step

**Steps**:
1. Reset onboarding using test helper
2. Skip the welcome wizard
3. Check checklist - "Create your workspace" should be:
   - ✅ Automatically checked (green checkmark)
   - ✅ Has green background
   - ✅ Text is crossed out

**Pass Criteria**: ✅ Step auto-completes if you have an organization

---

### **Test 4: Auto-Complete - Create Project**

**Goal**: Verify project creation completes the step

**Steps**:
1. Reset onboarding
2. Go to Dashboard
3. Click "Create Project" button
4. If at limit, you'll see upgrade prompt - that's correct behavior!
5. If you can create, fill out project form and submit
6. **Expected**:
   - Toast notification: "Project Created"
   - Checklist updates: "Create your first project" gets checked
   - Progress bar increases

**Pass Criteria**: ✅ Step completes immediately after project creation

---

### **Test 5: Auto-Complete - Invite Member**

**Goal**: Verify invitation completes the step

**Steps**:
1. Reset onboarding
2. Go to Team Management page
3. Click "Invite Member" button
4. If at limit, you'll see upgrade prompt - that's correct behavior!
5. If you can invite, enter an email and role
6. Click "Send Invitation"
7. **Expected**:
   - Toast notification: "Invitation Sent"
   - Checklist updates: "Invite team members" gets checked
   - Progress bar increases

**Pass Criteria**: ✅ Step completes immediately after sending invitation

---

### **Test 6: Auto-Complete - Create Task**

**Goal**: Verify task creation completes the step

**Steps**:
1. Reset onboarding
2. Navigate to any project
3. Click "New Task" button
4. If at limit, you'll see upgrade prompt - that's correct behavior!
5. If you can create, fill out task form and submit
6. **Expected**:
   - Toast notification: "Task Created"
   - Checklist updates: "Create your first task" gets checked
   - Progress bar increases

**Pass Criteria**: ✅ Step completes immediately after task creation

---

### **Test 7: 100% Completion**

**Goal**: Verify behavior when all steps are done

**Steps**:
1. Complete all 5 onboarding steps
2. **Expected**:
   - Progress bar shows 100%
   - "Complete!" badge appears
   - All steps have green checkmarks
   - Celebration message appears: "🎉 You're all set!"
3. Dismiss the checklist
4. Refresh the page
5. **Expected**: Checklist does NOT reappear (stays dismissed)

**Pass Criteria**: ✅ Completion is properly saved

---

### **Test 8: Persistence**

**Goal**: Verify onboarding state persists across sessions

**Steps**:
1. Complete 2-3 onboarding steps
2. Note which steps are completed
3. Refresh the page
4. **Expected**: Same steps remain completed
5. Open browser DevTools → Application → Local Storage
6. Find key: `flowsync-onboarding-{your-user-id}`
7. **Expected**: See JSON with your progress

**Pass Criteria**: ✅ State persists correctly

---

### **Test 9: Test Helper Panel (Dev Only)**

**Goal**: Verify test helper works correctly

**Steps**:
1. Look for yellow "DEV ONLY" panel in bottom-left corner
2. Verify it shows:
   - ✅ Current wizard status (Visible/Hidden)
   - ✅ Current checklist status (Visible/Hidden)
   - ✅ Progress percentage
   - ✅ List of all steps with checkboxes
   - ✅ "Reset Onboarding" button
   - ✅ Hide/Show buttons
3. Click any step's checkbox
4. **Expected**: That step gets marked complete in checklist
5. Click "Reset Onboarding"
6. **Expected**: Welcome wizard reappears, all progress resets

**Pass Criteria**: ✅ All test helper functions work

---

### **Test 10: Usage Limits Integration**

**Goal**: Verify onboarding works with usage limits

**Steps**:
1. If on Free plan with limits reached:
   - Try to create project → See upgrade prompt ✅
   - Try to invite member → See upgrade prompt ✅
   - Try to create task → See upgrade prompt ✅
2. Click upgrade prompt
3. **Expected**: Navigates to pricing page
4. Verify onboarding steps DON'T complete when hitting limits

**Pass Criteria**: ✅ Limits prevent step completion correctly

---

## 🐛 Common Issues & Solutions

### Issue: Wizard doesn't appear for new user
**Solution**: Check localStorage - delete `flowsync-onboarding-{userId}` key and refresh

### Issue: Steps don't auto-complete
**Solution**: Check browser console for errors. Ensure hooks are imported correctly.

### Issue: Checklist doesn't appear
**Solution**: Check that `showChecklist` is `true` in localStorage, or reset onboarding

### Issue: Test helper not visible
**Solution**: Ensure you're running in development mode (`NODE_ENV=development`)

---

## 📸 Expected Visual Results

### Welcome Wizard:
- Clean modal dialog
- Purple/primary colored icons
- Smooth left/right transitions
- Progress bar at top
- Step dots at bottom center

### Onboarding Checklist:
- Floating card bottom-right
- White/dark background (theme-aware)
- Green checkmarks for completed steps
- Circle icons for pending steps
- Smooth expand/collapse animation

### Test Helper (Dev):
- Yellow border card bottom-left
- "DEV ONLY" yellow badge
- List of all steps
- Reset and visibility buttons

---

## ✅ Final Verification Checklist

After testing all scenarios:

- [ ] Welcome wizard displays on first use
- [ ] Wizard can be skipped
- [ ] Wizard can be navigated back/forward
- [ ] Checklist appears after wizard
- [ ] Checklist can be collapsed/expanded
- [ ] Checklist can be dismissed
- [ ] Organization step auto-completes
- [ ] Project creation completes step
- [ ] Member invitation completes step
- [ ] Task creation completes step
- [ ] 100% completion shows celebration
- [ ] State persists across refreshes
- [ ] Test helper works (dev mode)
- [ ] Usage limits prevent actions correctly
- [ ] No console errors
- [ ] Animations are smooth

---

## 🚀 Testing Commands

```bash
# Run development server
bun run dev

# Build to check for compilation errors
bun run build

# Clear all onboarding data (browser console)
localStorage.removeItem('flowsync-onboarding-{userId}')

# Reset for current user (browser console, must be logged in)
# You'll need to manually trigger this via the test helper UI
```

---

## 📝 Notes

- Test helper only appears in **development mode**
- In production, test helper will be automatically hidden
- Each user has separate onboarding state
- Onboarding state is stored in localStorage
- Wizard only shows once per user (unless reset)
- Checklist persists until dismissed or all steps complete

---

## ✨ Success Criteria

**Onboarding is working correctly if**:
1. ✅ New users see welcome wizard
2. ✅ Checklist guides users through key actions
3. ✅ Steps auto-complete when actions are performed
4. ✅ Progress persists across sessions
5. ✅ No JavaScript errors in console
6. ✅ All animations are smooth
7. ✅ UI is responsive on mobile/desktop

---

**Ready to Test!** 🎉

Start by running `bun run dev` and signing in. Use the test helper in the bottom-left to reset and try different scenarios!
