import Head from 'next/head'
import {SWRConfig} from 'swr'
import {ChatApp} from '../components/ChatApp'
import {Layout} from '../components/Layout'
import {api} from '../mocks/api'
import {Conversation} from '../types'

export interface DemoProps {
  fallback: Conversation[]
}

export default function Home({fallback}: DemoProps) {
  return (
    <SWRConfig value={{fallback}}>
      <Head>
        <title>Blink take home app</title>
        <meta name="description" content="Blink take home app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <ChatApp />
      </Layout>
    </SWRConfig>
  )
}

export async function getStaticProps() {
  const data = await api.getConversations()
  return {
    props: {
      fallback: {
        '/api/conversations': data,
      },
    },
  }
}
