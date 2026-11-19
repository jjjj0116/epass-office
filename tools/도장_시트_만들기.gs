/**
 * (주)이패스상사 사무실 — 결재 도장 시트
 * 1) makeStampSheet()  : 처음 한 번. 「도장_결재_1기」 스프레드시트를 만든다(탭 2개: 명단 · 공개).
 * 2) fillStampCodes()  : 수강생 5명이 입장한 뒤 한 번. 「명단」 A열 이름마다 B열 코드를 채운다.
 * 강사는 「명단」 C~F열(1주~4주)에 「승인」 또는 「재승인」을 고른다.
 * 「공개」 탭에는 이름 없이 코드와 도장만 보인다. 이 탭만 웹에 게시한다.
 */
var SHEET_NAME = '도장_결재_1기';

function makeStampSheet() {
  var ss = SpreadsheetApp.create(SHEET_NAME);
  var list = ss.getSheets()[0];
  list.setName('명단');
  list.getRange('A1:F1').setValues([['이름', '코드(자동)', '1주', '2주', '3주', '4주']]).setFontWeight('bold');
  list.setFrozenRows(1);
  var rule = SpreadsheetApp.newDataValidation().requireValueInList(['승인', '재승인'], true).setAllowInvalid(false).build();
  list.getRange('C2:F30').setDataValidation(rule);
  list.setColumnWidth(1, 110); list.setColumnWidth(2, 120);

  var pub = ss.insertSheet('공개');
  pub.getRange('A1').setFormula('={"코드","1주","2주","3주","4주"}');
  pub.getRange('A2').setFormula('=FILTER(명단!B2:F30, 명단!B2:B30<>"")');
  Logger.log('만든 시트: ' + ss.getUrl());
}

function fillStampCodes() {
  var files = DriveApp.getFilesByName(SHEET_NAME);
  if (!files.hasNext()) { Logger.log('「' + SHEET_NAME + '」 시트를 찾지 못했어요. makeStampSheet()를 먼저 실행하세요.'); return; }
  var list = SpreadsheetApp.open(files.next()).getSheetByName('명단');
  var last = list.getLastRow();
  if (last < 2) { Logger.log('명단 A열에 이름이 없어요.'); return; }
  var names = list.getRange(2, 1, last - 1, 1).getValues();
  var codes = names.map(function (r) { var n = String(r[0]).trim(); return [n ? stampKey(n) : '']; });
  list.getRange(2, 2, codes.length, 1).setValues(codes);
  names.forEach(function (r, i) { if (String(r[0]).trim()) Logger.log(r[0] + ' → ' + codes[i][0]); });
}

/* 사무실 페이지(index.html)의 stampKey와 같은 계산. 바꾸면 두 곳을 함께 바꾼다. */
function stampKey(name) {
  var h = 2166136261, s = String(name) + '|epass-stamp-1기';
  for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
  var A = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789', o = '';
  for (var j = 0; j < 8; j++) { o += A[h % 31]; h = (Math.floor(h / 31) + Math.imul(h, 7) + j) >>> 0; }
  return o;
}
