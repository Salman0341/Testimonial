/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { RichText, MediaUpload, MediaUploadCheck, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Button } from '@wordpress/components';

import { get, isEmpty } from 'lodash';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @param {Object} [props]           Properties passed from the editor.
 * @param {string} [props.className] Class name generated for the block.
 *
 * @return {WPElement} Element to render.
 */
function Edit(props) {
	const { content, title, companyName, avatarImage } = props.attributes;

	const ALLOWED_TYPE = [ 'image' ];

	return (
		<Fragment>
			<div className="acfb_testimonial_wrap">
				<div className="acfb_testimonial_text">
					<RichText
						value={content}
						tagName="p"
						onChange={(newContent) => props.setAttributes({ content: newContent })}
					/>
				</div>
				<div className="acfb_testimonial_bio">
					<div className="acfb_testimonial_avatar_wrap">
						{!isEmpty(avatarImage) && (
							<img className="acfb_testimonial_avatar" src={get(avatarImage, 'url')} />
						)}
					</div>
					<div className="acfb_testimonial_info_wrap">
						<h2 className="acfb_testimonial_name">
							<RichText
								value={title}
								tagName="h2"
								onChange={(newTitle) => props.setAttributes({ title: newTitle })}
							/>
						</h2>
						<span className="acfb_testimonial_position">
							<RichText
								value={companyName}
								tagName="span"
								onChange={(newCompanyName) => props.setAttributes({ companyName: newCompanyName })}
							/>
						</span>
					</div>
				</div>
			</div>
			<InspectorControls>
				<PanelBody title="General">
					<MediaUploadCheck>
						<MediaUpload
							allowedTypes={ALLOWED_TYPE}
							value={avatarImage}
							onSelect={(media) => props.setAttributes({ avatarImage: media })}
							render={({ open }) => {
								return (
									<Button
										isPrimary
										onClick={() => {
											if (isEmpty(avatarImage)) {
												open();
											} else {
												props.setAttributes({ avatarImage: {} });
											}
										}}
									>
										{isEmpty(avatarImage) ? 'Upload Avatar' : 'Remove Avatar'}
									</Button>
								);
							}}
						/>
					</MediaUploadCheck>
				</PanelBody>
			</InspectorControls>
		</Fragment>
	);
}

export default Edit;
