import { Lang, Plan } from '../types'
type Dict = Record<string, string>
const en: Dict = {
  alarms: 'Alarms', people: 'People', plans: 'Plans', profile: 'Profile', newAlarm: 'New alarm', editAlarm: 'Edit alarm',
  label: 'Label', time: 'Time', repeat: 'Repeat', save: 'Save', cancel: 'Cancel', delete: 'Delete', edit: 'Edit',
  confirmAlarm: 'Delete this alarm?', confirmConn: 'Remove this connection?', irreversible: 'This cannot be undone.',
  guestTitle: 'Sign in to share alarms', guestText: 'Alarms work without an account. Sign in to connect with a partner or family.',
  signIn: 'Sign in', signOut: 'Sign out', contactPh: 'Phone or email', sendCode: 'Send code', codePh: '6-digit code', verify: 'Verify', demoCode: 'Demo code: 123456', wrongCode: 'Wrong code. Try again.',
  mine: 'My alarms', shared: 'Shared with me', noAlarms: 'No alarms yet. Tap + to add one.', noPeople: 'Nobody connected yet.',
  connect: 'Connect', yourCode: 'Your invite code', copy: 'Copy', copied: 'Copied', enterCode: "Partner's invite code", partnerName: 'Name', color: 'Color', add: 'Add',
  allowControl: 'Can edit and dismiss my alarms', youCanControl: 'You can control their alarms', noControl: 'View only',
  theme: 'Theme', system: 'System', light: 'Light', dark: 'Dark', language: 'Language',
  upgrade: 'Upgrade', upgradeTitle: 'Unlock this feature', currentPlan: 'Current plan', perMonth: '/ month', maybeLater: 'Not now', choose: 'Choose',
  needPro: 'This needs Pro.', needUltimate: 'This needs Ultimate.',
  limitAlarms: 'Basic includes 3 alarms.', limitPeople: 'Your plan limit for connections is reached.', remote: 'Remote control of alarms', repeatDays: 'Custom repeat days',
  critical: 'Critical alert (bypasses Do Not Disturb)', awake: 'Ask "Are you awake?" after ringing', ad: 'Ad space · Upgrade to Pro to remove',
  everyDay: 'Every day', basic: 'Basic', pro: 'Pro', ultimate: 'Ultimate', free: 'Free', manat: '₼',
}
const az: Dict = {
  alarms: 'Zənglər', people: 'Yaxınlar', plans: 'Planlar', profile: 'Profil', newAlarm: 'Yeni zəng', editAlarm: 'Zəngi dəyiş',
  label: 'Ad', time: 'Vaxt', repeat: 'Təkrar', save: 'Yadda saxla', cancel: 'Ləğv et', delete: 'Sil', edit: 'Dəyiş',
  confirmAlarm: 'Bu zəng silinsin?', confirmConn: 'Bu əlaqə silinsin?', irreversible: 'Bu əməliyyatı geri qaytarmaq olmur.',
  guestTitle: 'Zəngləri paylaşmaq üçün daxil olun', guestText: 'Zənglər hesabsız da işləyir. Partnyor və ya ailə ilə əlaqə üçün daxil olun.',
  signIn: 'Daxil ol', signOut: 'Çıxış', contactPh: 'Telefon və ya e-poçt', sendCode: 'Kod göndər', codePh: '6 rəqəmli kod', verify: 'Təsdiqlə', demoCode: 'Demo kod: 123456', wrongCode: 'Kod yanlışdır. Yenidən yoxlayın.',
  mine: 'Mənim zənglərim', shared: 'Mənimlə paylaşılan', noAlarms: 'Hələ zəng yoxdur. Əlavə etmək üçün + basın.', noPeople: 'Hələ heç kim qoşulmayıb.',
  connect: 'Qoşul', yourCode: 'Dəvət kodunuz', copy: 'Kopyala', copied: 'Kopyalandı', enterCode: 'Partnyorun dəvət kodu', partnerName: 'Ad', color: 'Rəng', add: 'Əlavə et',
  allowControl: 'Zənglərimi dəyişə və söndürə bilər', youCanControl: 'Onun zənglərini idarə edə bilərsiniz', noControl: 'Yalnız baxış',
  theme: 'Tema', system: 'Sistem', light: 'Açıq', dark: 'Tünd', language: 'Dil',
  upgrade: 'Yüksəlt', upgradeTitle: 'Bu funksiyanı aç', currentPlan: 'Cari plan', perMonth: '/ ay', maybeLater: 'İndi yox', choose: 'Seç',
  needPro: 'Bunun üçün Pro lazımdır.', needUltimate: 'Bunun üçün Ultimate lazımdır.',
  limitAlarms: 'Basic planda 3 zəng var.', limitPeople: 'Planınızdakı əlaqə limiti dolub.', remote: 'Zənglərə uzaqdan nəzarət', repeatDays: 'Fərdi təkrar günləri',
  critical: 'Kritik xəbərdarlıq (Narahat etməyin rejimini keçir)', awake: 'Zəngdən sonra "Oyaqsan?" soruş', ad: 'Reklam yeri · Silmək üçün Pro-ya keçin',
  everyDay: 'Hər gün', basic: 'Basic', pro: 'Pro', ultimate: 'Ultimate', free: 'Pulsuz', manat: '₼',
}
const ru: Dict = {
  alarms: 'Будильники', people: 'Близкие', plans: 'Тарифы', profile: 'Профиль', newAlarm: 'Новый будильник', editAlarm: 'Изменить будильник',
  label: 'Название', time: 'Время', repeat: 'Повтор', save: 'Сохранить', cancel: 'Отмена', delete: 'Удалить', edit: 'Изменить',
  confirmAlarm: 'Удалить этот будильник?', confirmConn: 'Удалить это подключение?', irreversible: 'Это действие нельзя отменить.',
  guestTitle: 'Войдите, чтобы делиться будильниками', guestText: 'Будильники работают без аккаунта. Войдите, чтобы подключить партнёра или семью.',
  signIn: 'Войти', signOut: 'Выйти', contactPh: 'Телефон или e-mail', sendCode: 'Отправить код', codePh: '6-значный код', verify: 'Подтвердить', demoCode: 'Демо-код: 123456', wrongCode: 'Неверный код. Попробуйте ещё раз.',
  mine: 'Мои будильники', shared: 'Доступные мне', noAlarms: 'Будильников пока нет. Нажмите +, чтобы добавить.', noPeople: 'Пока никто не подключён.',
  connect: 'Подключить', yourCode: 'Ваш код приглашения', copy: 'Копировать', copied: 'Скопировано', enterCode: 'Код приглашения партнёра', partnerName: 'Имя', color: 'Цвет', add: 'Добавить',
  allowControl: 'Может менять и отключать мои будильники', youCanControl: 'Вы можете управлять его будильниками', noControl: 'Только просмотр',
  theme: 'Тема', system: 'Системная', light: 'Светлая', dark: 'Тёмная', language: 'Язык',
  upgrade: 'Улучшить', upgradeTitle: 'Откройте эту функцию', currentPlan: 'Текущий тариф', perMonth: '/ мес', maybeLater: 'Не сейчас', choose: 'Выбрать',
  needPro: 'Нужен тариф Pro.', needUltimate: 'Нужен тариф Ultimate.',
  limitAlarms: 'В Basic доступно 3 будильника.', limitPeople: 'Достигнут лимит подключений вашего тарифа.', remote: 'Удалённое управление будильниками', repeatDays: 'Свои дни повтора',
  critical: 'Критическое уведомление (обходит «Не беспокоить»)', awake: 'Спрашивать «Вы проснулись?» после звонка', ad: 'Место для рекламы · Уберите её с Pro',
  everyDay: 'Каждый день', basic: 'Basic', pro: 'Pro', ultimate: 'Ultimate', free: 'Бесплатно', manat: '₼',
}
export const translations: Record<Lang, Dict> = { en, az, ru }
export const PLAN_FEATURES: Record<Lang, Record<Plan, string[]>> = {
  en: { basic: ['Up to 3 local alarms', '1 connected partner', 'Banner ads'], pro: ['Up to 5 family members', 'Remote toggle and edit permissions', 'No ads', 'Flexible repeat schedules'], ultimate: ['Everything in Pro', 'Critical alerts', '"Are you awake?" check', 'Unlimited group connections'] },
  az: { basic: ['3-ə qədər lokal zəng', '1 qoşulmuş partnyor', 'Banner reklamlar'], pro: ['5-ə qədər ailə üzvü', 'Uzaqdan söndürmə və dəyişmə icazələri', 'Reklamsız', 'Çevik təkrar cədvəlləri'], ultimate: ['Pro-dakı hər şey', 'Kritik xəbərdarlıqlar', '"Oyaqsan?" yoxlaması', 'Limitsiz qrup əlaqələri'] },
  ru: { basic: ['До 3 локальных будильников', '1 подключённый партнёр', 'Баннерная реклама'], pro: ['До 5 членов семьи', 'Удалённое включение и изменение', 'Без рекламы', 'Гибкие графики повтора'], ultimate: ['Всё из Pro', 'Критические уведомления', 'Проверка «Вы проснулись?»', 'Безлимитные группы'] },
}
