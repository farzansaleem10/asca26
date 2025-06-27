const SHEET_API_URL = 'YOUR_COPIED_WEB_APP_URL_HERE'; // Make sure this is still correct!

export async function getSheetData() {
  try {
    const response = await fetch(SHEET_API_URL);
    const rawResponseText = await response.text();
    console.log('Raw response from Google Apps Script (getSheetData):', rawResponseText);
    const data = JSON.parse(rawResponseText);
    return { success: true, data };
  } catch (error) {
    console.error('Sheet Fetch Error (in getSheetData):', error.message);
    return { success: false, message: 'Failed to fetch sheet data. Check console.' };
  }
}

export async function appendToSheet(entry) {
  try {
    const response = await fetch(SHEET_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    });
    const rawResultText = await response.text();
    console.log('Raw response from Google Apps Script (appendToSheet):', rawResultText);
    const result = JSON.parse(rawResultText);
    return { success: result.status === 'success' };
  } catch (error) {
    console.error('Sheet Append Error (in appendToSheet):', error.message);
    return { success: false, message: 'Failed to append data. Check console.' };
  }
}