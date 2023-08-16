/*
 * Copyright 2014-2018 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import '@/assets/css/base.scss';
import i18n from './i18n'
import {encryption} from '@/utils/encryption';

document.querySelectorAll('[data-i18n]')
  .forEach(t => {
    let [attribute, key] = t.getAttribute('data-i18n').split(':');
    if (!key) {
      key = attribute;
      attribute = undefined;
    }

    if (attribute) {
      t.setAttribute(attribute, i18n.t(key));
    } else {
      t.innerHTML = i18n.t(key);
    }
  });

document.getElementById('login_form_submit')
    .addEventListener('click', function () {
        const form = this.form;
        const username = form.username.value;
        const password = form.password.value;
        if(username != '' && password != '') {
            const userInfo = {
                password: password
            };
            const encryptedData = encryption({
                data: userInfo,
                key: 'ncncncncncncncnc',
                param: ['password']
            })
            form.password.value = encryptedData.password;
        }
        form.submit();
    });
