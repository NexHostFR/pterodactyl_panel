import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

// ⚡ TransProps peut être générique ou non selon la version
type MyTransProps = Parameters<typeof Trans>[0]; // récupère le type des props de Trans

type Props = Omit<MyTransProps, 't'>;

export default ({ ns, children, ...props }: Props) => {
    const { t } = useTranslation(ns);

    return (
        <Trans t={t} {...props}>
            {children}
        </Trans>
    );
};
