import type { AppBindingPlayer } from 'skland-kit'
import { isEnvEnabled } from './env'

/**
 * Format game name from appCode
 */
export function formatGameName(appCode: string): string {
  const gameNameMap: Record<string, string> = {
    arknights: '明日方舟',
    endfield: '终末地',
  }
  return gameNameMap[appCode] || appCode
}

export function formatCharacterName(character: AppBindingPlayer, appName?: string) {
  const gamePrefix = appName ? `【${appName}】` : ''
  return `${gamePrefix}${character.channelName}角色 ${formatPrivacyName(character)}`
}

export function formatPrivacyName(character: AppBindingPlayer) {
  // eslint-disable-next-line node/prefer-global/process
  const isMinimalPrivacy = isEnvEnabled(process.env.SKLAND_ANONYMOUS)
  const isNoMask = isEnvEnabled(process.env.SKLAND_NO_MASK)

  // 终末地的昵称在 defaultRole 里取
  if (character.gameId === 3) {
    const rawNickname = character.defaultRole?.nickname || ''
    const nickname = isMinimalPrivacy
      ? '管理员'
      : rawNickname
        ? (isNoMask ? rawNickname : maskNickname(rawNickname))
        : '管理员'
    return `${nickname} lv.${character.defaultRole?.level || 0}`
  }

  const nickName = character.nickName
  const [name, number] = nickName.split('#')
  if (!name)
    throw new Error('Unexpected Error: 明日方舟 nickName 格式不正确')

  const displayName = isMinimalPrivacy
    ? '博士 '
    : (isNoMask ? name : maskNickname(name))
  return `${displayName}#${number}`
}

function maskNickname(name: string) {
  if (name.length <= 1)
    return '*'

  const firstChar = name[0]
  const stars = '*'.repeat(name.length - 1)
  return `${firstChar}${stars}`
}
