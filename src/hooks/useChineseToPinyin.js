import { pinyin } from 'pinyin-pro';
export default function (chinese) {
  let pinyinStringAll = pinyin(chinese, { toneType: 'none' })
  let pinyinStringPattern = pinyin(chinese, { pattern: 'first' })
  if (pinyinStringAll) {
    pinyinStringAll = pinyinStringAll.replace(/\s+/g, '');
  }
  if (pinyinStringPattern) {
    pinyinStringPattern = pinyinStringPattern.replace(/\s+/g, '');
  }
  return pinyinStringAll + '-' + pinyinStringPattern
}
