interface DocLink {
  rt_name?: string
  rt_path?: string
  pr_name?: string
  ad_name?: string
}

const rt = {
  git: {
    src: 'https://github.com/multisynq/react-together/blob/develop/packages/react-together/src/',
    demo: 'https://github.com/multisynq/react-together/blob/develop/website/src/components/demo/',
  },
}

const pr = {
  docs: 'https://primereact.org/',
  git: {
    src: 'https://github.com/multisynq/react-together/blob/develop/packages/react-together-primereact/src/components',
    demo: 'https://github.com/multisynq/react-together/blob/develop/website/src/components/demo/primereact',
  },
}

const ad = {
  docs: 'https://ant.design/components/',
  git: {
    src: 'https://github.com/multisynq/react-together/blob/develop/packages/react-together-ant-design/src/components',
    demo: 'https://github.com/multisynq/react-together/blob/develop/website/src/components/demo/antdesign',
  },
}

export default function getDocLinks({ rt_name, rt_path, pr_name, ad_name }: DocLink) {
  if (pr_name) {
    return {
      doc_primereact: `${pr.docs}${pr_name.toLowerCase()}/`,
      github_demo: `${pr.git.demo}/PrimeReact${rt_name}Demo.tsx`,
      github_source: `${pr.git.src}/${rt_name}.tsx`,
    }
  }

  if (ad_name) {
    return {
      doc_antdesign: `${ad.docs}${ad_name.toLowerCase()}/`,
      github_demo: `${ad.git.demo}/AntDesign${rt_name}Demo.tsx`,
      github_source: `${ad.git.src}/${rt_name}.tsx`,
    }
  }

  if (rt_path) {
    return {
      github_demo: `${rt.git.demo}/${rt_path}`,
      github_source: `${rt.git.src}/${rt_path}`,
    }
  }

  return {
    github_demo: `${rt.git.demo}${rt_name}Demo.tsx`,
    github_source: `${rt.git.src}/${rt_name}.tsx`,
  }
}
