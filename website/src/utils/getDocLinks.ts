interface DocLink {
  rt_name: string
  pr_name?: string
}

export default function getDocLinks({ rt_name, pr_name }: DocLink) {
  const github_source_pre = 'https://github.com/multisynq/react-together/blob/develop/packages/react-together-primereact/src/components'
  const github_demo_pre = 'https://github.com/multisynq/react-together/blob/develop/website/src/components/demo'
  const primereact_pre = 'https://primereact.org/'

  if (pr_name) {
    const doc_primereact = `${primereact_pre}${pr_name.toLowerCase()}/`
    const github_demo = `${github_demo_pre}/PrimeReact${rt_name}Demo.tsx`
    const github_source = `${github_source_pre}/${rt_name}.tsx`

    return {
      doc_primereact,
      github_demo,
      github_source,
    }
  }

  return {}
}
