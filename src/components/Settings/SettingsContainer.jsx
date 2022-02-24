import { Button, Select, Switch } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { Aside, CardSplit, Form, toast, Typography } from 'components/shared'
import { PageHeading, PageTitle } from 'components/shared/Layout'
import { logoutAction } from 'store/authSlice'
import { selectSettings, setSettings } from 'store/settingsSlice'

import Profile from './Profile'

const themeOptions = [
  { label: 'Dark', value: 'dark' },
  { label: 'Light', value: 'light' },
  { label: 'Device default', value: 'device' },
]

const SettingsContainer = () => {
  const dispatch = useDispatch()
  const settings = useSelector(selectSettings)
  const [form] = Form.useForm()

  const handleSettingsChange = async (changedValues, allValues) => {
    let { notifications } = allValues
    if (
      changedValues?.notifications &&
      Notification?.permission !== 'granted'
    ) {
      notifications = false
    }

    dispatch(setSettings({ ...allValues, notifications }))
  }

  const handleLogout = async () => {
    try {
      const response = await dispatch(logoutAction())
      toast({ status: 'success', content: response?.payload?.detail })
    } catch (error) {
      toast({ status: 'error', content: error })
    }
  }

  return (
    <>
      <PageHeading>
        <PageTitle>Settings</PageTitle>
      </PageHeading>

      <Form
        form={form}
        name="settings"
        layout="vertical"
        onValuesChange={handleSettingsChange}
        initialValues={settings}
      >
        <CardSplit
          main={<Heading>Theme</Heading>}
          sub={
            <Form.Item name="theme">
              <Select options={themeOptions} showArrow />
            </Form.Item>
          }
          subWidth="10rem"
        />

        <CardSplit
          main={
            <>
              <Heading>Notifications</Heading>
              <SubHeading>
                Get notifications before your lecture starts! We might also send
                you occasional updates about new features on ResoBin.
              </SubHeading>
            </>
          }
          sub={
            <Form.Item
              name="notifications"
              valuePropName="checked"
              rules={[
                {
                  validator: async (_, value) => {
                    if (value === false) return

                    if (!('Notification' in window))
                      throw new Error(
                        'Device does not support web notifications.'
                      )

                    const permission = await Notification.requestPermission()
                    if (permission !== 'granted')
                      throw new Error(
                        'Notifications were not enabled. Please enable them in your browser settings.'
                      )
                  },
                },
              ]}
            >
              <Switch />
            </Form.Item>
          }
          subWidth="10rem"
        />

        <CardSplit
          main={
            <>
              <Heading>Privacy</Heading>
              <SubHeading>
                We collect anonymous, aggregated usage information on ResoBin -
                think of it as a survey to tells us which browsers to support
                and what features are popular. We do not use this information
                for advertising, or share this information with anybody.
                <br />
                If you opt out, we could end up removing features that you use
                since we wont know if anyone is using them.
              </SubHeading>
            </>
          }
          sub={
            <Form.Item name="tracking" valuePropName="checked">
              <Switch />
            </Form.Item>
          }
          subWidth="10rem"
        />

        <CardSplit
          main={<Heading>Account</Heading>}
          sub={
            <StyledButton type="primary" danger onClick={handleLogout}>
              Logout
            </StyledButton>
          }
          subWidth="10rem"
        />
      </Form>

      <Aside
        title="Profile"
        subtitle={
          <Typography.Link href="https://gymkhana.iitb.ac.in/profiles/user/">
            Modify
          </Typography.Link>
        }
      >
        <Profile />
      </Aside>
    </>
  )
}

export default SettingsContainer

const Heading = styled.h1`
  color: ${({ theme }) => theme.textColor};
  font-weight: 600;
  font-size: 1.125rem;
`

const SubHeading = styled.p`
  margin-top: 0.5rem;
  margin-bottom: 0;
  color: ${({ theme }) => theme.textColorInactive};
  font-size: 0.875rem;
`

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.75rem;
  font-weight: 500;
  font-size: 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius};
`
