/// <reference types="node" />

import { SearchEntryObject, ClientOptions } from 'ldapjs'

declare module 'ldap-authentication' {
  export class LdapAuthenticationError extends Error {}

  export interface LdapAuthenticationBaseOptions {
    ldapOpts: ClientOptions
    starttls?: boolean = false

    groupsSearchBase?: string
    groupClass?: string
    groupMemberAttribute?: string
    groupMemberUserAttribute?: string
  }

  export interface LdapAuthenticationOptionsSimple
    extends LdapAuthenticationBaseOptions {
    userDn: string
    userPassword: string
  } // true

  export interface LdapAuthenticationOptionsAdminCommon
    extends LdapAuthenticationBaseOptions {
    adminDn: string
    adminPassword: string
    userSearchBase: string
    usernameAttribute: string
    username: string
  } // user

  export interface LdapAuthenticationOptionsAdmin
    extends LdapAuthenticationOptionsAdminCommon {
    verifyUserExists?: false
    userPassword: string
  } // user

  export interface LdapAuthenticationOptionsAdminSearch
    extends LdapAuthenticationOptionsAdminCommon {
    verifyUserExists: true
  } // user

  export interface LdapAuthenticationOptionsSelf
    extends LdapAuthenticationBaseOptions {
    userDn: string
    userPassword: string
    userSearchBase: string
    usernameAttribute: string
    username: string
  }

  export function authenticate(
    options: LdapAuthenticationOptionsSimple
  ): Promise<true>

  export function authenticate(
    options: LdapAuthenticationOptionsSelf
  ): Promise<SearchEntryObject | null>

  export function authenticate(
    options: LdapAuthenticationOptionsAdminCommon
  ): Promise<SearchEntryObject | null>

}
