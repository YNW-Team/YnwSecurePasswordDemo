import React, { useState } from 'react';
import { Button, Form, Input, InputNumber, Radio, Space } from 'antd';
import { ConfigType } from '@services/types';
import { ClearOutlined, CodeOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { GeneratorStateI, setGeneratorState } from '@services/reducers';
import { generatePassword } from '@services/services';

const ConfigurationForm = () => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const [configType, setConfigType] = useState<ConfigType>(ConfigType.default);

	const onConfigTypeChange = ({ target }) => {
		form.setFieldsValue({ type: target.value, length: undefined, rules: [] });
		setConfigType(target.value);
	};

	const onReset = () => {
		form.setFieldsValue({ length: undefined, rules: [] });
	};

	const onSubmit = values => {
		const generatorState: GeneratorStateI = generatePassword(values);
		dispatch(setGeneratorState(generatorState));
	};

	return (
		<Form form={form} layout="vertical" initialValues={{ type: configType }} onFinish={onSubmit} onReset={onReset}>
			<Form.Item label="Config type" name="type">
				<Radio.Group onChange={onConfigTypeChange}>
					<Radio.Button value={ConfigType.default}>{ConfigType.default}</Radio.Button>
					<Radio.Button value={ConfigType.lengthOnly}>{ConfigType.lengthOnly}</Radio.Button>
					<Radio.Button value={ConfigType.customConfig}>{ConfigType.customConfig}</Radio.Button>
				</Radio.Group>
			</Form.Item>
			{configType !== ConfigType.default && (
				<Form.Item name="length" label="Length" rules={[{ required: true, message: 'Missing length' }]}>
					<InputNumber />
				</Form.Item>
			)}
			{configType === ConfigType.customConfig && (
				<Form.Item label="Rules">
					<Form.List name="rules">
						{(fields, { add, remove }) => (
							<>
								{fields.map(field => (
									<Space key={field.key} style={{ display: 'flex' }} align="baseline">
										<Form.Item
											{...field}
											name={[field.name, 'chars']}
											fieldKey={[field.fieldKey, 'chars']}
											rules={[{ required: true, message: 'Missing chars' }]}
										>
											<Input placeholder="Chars" />
										</Form.Item>
										<Form.Item {...field} name={[field.name, 'min']} fieldKey={[field.fieldKey, 'min']}>
											<InputNumber placeholder="Min" />
										</Form.Item>
										<MinusCircleOutlined onClick={() => remove(field.name)} />
									</Space>
								))}
								<Form.Item>
									<Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
										Add rule
									</Button>
								</Form.Item>
							</>
						)}
					</Form.List>
				</Form.Item>
			)}
			<Form.Item>
				<Space>
					<Button type="primary" icon={<CodeOutlined />} htmlType="submit">
						Generate
					</Button>
					{configType !== ConfigType.default && (
						<Button htmlType="reset" icon={<ClearOutlined />}>
							Reset
						</Button>
					)}
				</Space>
			</Form.Item>
		</Form>
	);
};

export default ConfigurationForm;
