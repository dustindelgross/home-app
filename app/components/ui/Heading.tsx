import { } from 'react';

type HeadingProps = {
	children: JSX.Element;
	level?: number;
	className?: string;
}

const Heading = ({
	children,
	level = 2,
	className = '',
}: {
	children: JSX.Element;
	level?: number;
	className?: string;
}) => {

	const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
	return <HeadingTag className={className}>{children}</HeadingTag>;
}

export default Heading;