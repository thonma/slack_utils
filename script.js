(() => {
  'use strict';

  /**
   * Slackの送信ボタンと同じ見た目のボタン要素を生成する
   * 
   * @param {string} textContent ボタンテキスト
   * @returns 
   */
  const createSendMsgBtnElem = (textContent, msg) => {
    const btn = document.createElement('button');
    btn.textContent = textContent;
    btn.onclick = function () {
      sendMsg(msg);

      // 連打防止
      this.disabled = true;
      const _this = this;
      setTimeout(() => {
        _this.disabled = false;
      }, 3000);
    };
    btn.classList.add('c-wysiwyg_container__button');
    btn.classList.add('c-wysiwyg_container__button--send');
    btn.style.width = 'auto';
    btn.style.padding = '0 8px';
    return btn;
  };

  /**
   * メッセージを送信する
   */
  const sendMsg = function (msg) {
    const msgTextarea = document.querySelector('body > div.p-client_container > div > div.p-workspace-layout > div:nth-child(5) > div.p-workspace__primary_view > div > div.p-file_drag_drop__container > div > div.p-workspace__primary_view_footer.p-workspace__primary_view_footer--float > div > div > div > div.p-message_pane_input_inner_main > div > div > div > div.c-texty_input_unstyled__container.c-texty_input_unstyled__container--size_medium.c-texty_input_unstyled__container--multi_line.c-texty_input_unstyled__container--no_actions > div > div.ql-editor');
    msgTextarea.innerHTML = msg;

    // NOTE: 入力直後は送信ボタンが無効になっているため setTimeout() で送信タイミングを遅らせる
    setTimeout(() => {
      const submitBtn = document.querySelector('body > div.p-client_container > div > div.p-workspace-layout > div:nth-child(5) > div.p-workspace__primary_view > div > div.p-file_drag_drop__container > div > div.p-workspace__primary_view_footer.p-workspace__primary_view_footer--float > div > div > div > div.p-message_pane_input_inner_main > div > div > div > div.c-wysiwyg_container__footer.c-wysiwyg_container__footer--with_formatting > div.c-wysiwyg_container__suffix > span > button.c-button-unstyled.c-icon_button.c-icon_button--size_small.c-wysiwyg_container__button.c-wysiwyg_container__button--send.c-icon_button--default');
      submitBtn.click();
    }, 100);
  };

  // NOTE: Chrome拡張が実行されるタイミングだと .c-texty_buttons が存在しないため setInterval() で描画できるタイミングを待つ
  const itvl = setInterval(() => {
    const btnContainer = document.querySelector('.c-texty_buttons');
    if (btnContainer === null) {
      return;
    }

    // ==============================================
    // レビューボタンの描画
    // ==============================================
    const reviewBtn = createSendMsgBtnElem('レビュー', 'レビュー');
    reviewBtn.style.marginLeft = 'auto'; // NOTE: 右寄せする
    btnContainer.insertAdjacentElement('beforeend', reviewBtn);

    // ==============================================
    // ヘルプボタンの描画
    // ==============================================
    const questionBtn = createSendMsgBtnElem('ヘルプ', 'ヘルプ');
    btnContainer.insertAdjacentElement('beforeend', questionBtn);

    clearInterval(itvl);
  }, 100);

})();