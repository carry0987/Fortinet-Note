import Heading from '@theme/Heading';
import clsx from 'clsx';
import type { ComponentProps, ComponentType, ReactNode } from 'react';
import styles from './styles.module.css';

type FeatureItem = {
    title: string;
    Svg: ComponentType<ComponentProps<'svg'>>;
    description: ReactNode;
};

const FeatureList: FeatureItem[] = [
    {
        title: 'Focused Operational Notes',
        Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
        description: (
            <>
                Short, task-oriented documentation for FortiGate administration, without template filler or tutorial
                noise.
            </>
        ),
    },
    {
        title: 'CLI-First Workflows',
        Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
        description: (
            <>
                Commands and configuration blocks stay intact, so the migrated site remains useful during actual
                troubleshooting and deployment work.
            </>
        ),
    },
    {
        title: 'Ready for Expansion',
        Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
        description: (
            <>
                The structure is now aligned with Docusaurus docs, making it straightforward to add more Fortinet
                products and categories later.
            </>
        ),
    },
];

function Feature({ title, Svg, description }: FeatureItem) {
    return (
        <div className={clsx('col col--4', styles.featureCol)}>
            <div className={styles.featureCard}>
                <div className="text--center">
                    <Svg className={styles.featureSvg} role="img" />
                </div>
                <div className="text--center padding-horiz--md">
                    <Heading as="h3">{title}</Heading>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
}

export default function HomepageFeatures(): ReactNode {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {FeatureList.map((props) => (
                        <Feature key={props.title} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}
