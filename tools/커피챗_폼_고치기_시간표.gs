/**
 * 커피챗 신청 폼 고치기 — 온라인 채팅 · 12/12(토)·12/13(일) 시간표 · 12/11(금) 18:00 마감
 * 사용법: script.google.com → 새 프로젝트 → 전부 붙여 넣기 → 저장 → fixCoffeeChatForm 실행 → 로그 확인
 */
function fixCoffeeChatForm() {
  var NAME = '커피챗 신청 — (주)이패스상사 경영지원팀';
  var files = DriveApp.getFilesByName(NAME);
  if (!files.hasNext()) { Logger.log('폼을 찾지 못했습니다: ' + NAME); return; }
  var f = FormApp.openById(files.next().getId());

  f.setDescription(
    '4주차 「나만의 업무 포트폴리오」 주제를 정하기 전에, 정아름 팀장과 15분 커피챗을 할 수 있습니다.\n' +
    '· 온라인 채팅으로 만납니다. 접속 링크는 이메일로 보내 드립니다.\n' +
    '· 신청 마감: 12/11(금) 18:00. 배정한 시간은 12/11(금) 밤까지 이메일로 알려 드립니다.\n' +
    '· 신청은 선택입니다. 고를 업종이나 반복 업무가 고민될 때 신청해 주세요.');

  var items = f.getItems();
  for (var i = items.length - 1; i >= 0; i--) {
    var t = items[i].getTitle();
    if (t === '만나는 방법' || t === '가능한 시간대') f.deleteItem(items[i]);
  }

  var slots = f.addCheckboxItem()
    .setTitle('가능한 시간을 모두 골라 주세요 (15분)')
    .setHelpText('고른 시간 중 하나를 팀장이 배정해 이메일로 알려 드립니다.')
    .setChoiceValues([
      '12/12(토) 14:00', '12/12(토) 14:20', '12/12(토) 14:40', '12/12(토) 15:00',
      '12/13(일) 14:00', '12/13(일) 14:20', '12/13(일) 14:40', '12/13(일) 15:00',
      '위 시간이 모두 안 돼요'
    ])
    .setRequired(true);
  f.moveItem(slots.getIndex(), 1); // 「사원증 이름」 바로 아래

  f.getItems().forEach(function (it) {
    if (it.getTitle() === '가능한 날짜와 시간') {
      it.asTextItem()
        .setTitle('위 시간이 모두 안 되면 가능한 때를 적어 주세요')
        .setHelpText('예: 12/12(토) 17시 이후')
        .setRequired(false);
    }
  });

  f.setConfirmationMessage('신청했습니다. 배정한 시간과 접속 링크는 12/11(금) 밤까지 이메일로 보내 드립니다.');
  Logger.log('고쳤습니다. 질문 순서: ' + f.getItems().map(function (x) { return x.getTitle(); }).join(' / '));
}
